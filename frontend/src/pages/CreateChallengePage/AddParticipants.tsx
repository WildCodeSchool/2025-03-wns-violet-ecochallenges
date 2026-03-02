import { useState, useEffect, useRef } from "react";
import { useLazyQuery } from "@apollo/client";
import { SEARCH_USERS } from "@/graphql/queries/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, X, ChevronLeft, ChevronRight } from "lucide-react";

const LIMIT = 5;

const preventDefault = (e: { preventDefault: () => void }) =>
  e.preventDefault();

type UserSuggestion = {
  id: number;
  username: string;
  email: string;
  pictureUrl: string;
};

export type Participant = {
  id: number;
  username: string;
};

type SearchUsersData = {
  searchUsers: {
    users: UserSuggestion[];
    totalCount: number;
  };
};

function AddParticipants({
  participants,
  setParticipants,
}: {
  participants: Participant[];
  setParticipants: (value: Participant[]) => void;
}) {
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [searchUsers, { data }] = useLazyQuery<SearchUsersData>(SEARCH_USERS);

  useEffect(() => {
    if (!input) {
      setShowSuggestions(false);
      return;
    }
    const timer = setTimeout(() => {
      searchUsers({ variables: { search: input, page, limit: LIMIT } });
      setShowSuggestions(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [input, page, searchUsers]);

  // Reset page to 1 when the search term changes
  useEffect(() => {
    setPage(1);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const totalCount = data?.searchUsers.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT);
  const suggestions = (data?.searchUsers.users ?? []).filter(
    (u: UserSuggestion) => !participants.some((p) => p.id === u.id),
  );

  const handleSelect = (user: UserSuggestion) => {
    setParticipants([
      ...participants,
      { id: user.id, username: user.username },
    ]);
    setInput("");
    setShowSuggestions(false);
  };

  const handleRemove = (id: number) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  return (
    <Card className="bg-secondary-foreground w-full">
      <CardHeader>
        <CardTitle className="text-black">Inviter un participant</CardTitle>
        <CardDescription className="text-black">
          Ajoutez des participants au challenge
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="relative mb-2">
          <Input
            type="text"
            placeholder="Saisissez un nom ou email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-white"
          />
          {showSuggestions && (
            <div className="absolute z-10 w-full bg-white border rounded shadow-md mt-1">
              <ul>
                {suggestions.map((user: UserSuggestion) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={preventDefault}
                    onClick={() => handleSelect(user)}
                  >
                    <img
                      src={user.pictureUrl}
                      alt={user.username}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-black">
                      {user.username}
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {user.email}
                    </span>
                  </li>
                ))}
                {suggestions.length === 0 && (
                  <li className="px-3 py-2 text-sm text-gray-400">
                    Aucun résultat
                  </li>
                )}
              </ul>
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-3 py-1 border-t text-xs text-gray-500">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    disabled={page === 1}
                    onMouseDown={preventDefault}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft size={14} />
                  </Button>
                  <span>
                    {page} / {totalPages}
                  </span>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    disabled={page === totalPages}
                    onMouseDown={preventDefault}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight size={14} />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
        <ul className="flex flex-col gap-2">
          {participants.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-2 bg-gray-100 rounded px-3 py-2"
            >
              <User size={16} className="text-gray-600" />
              <span className="flex-1 text-black text-sm">{p.username}</span>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => handleRemove(p.id)}
              >
                <X size={16} />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default AddParticipants;
