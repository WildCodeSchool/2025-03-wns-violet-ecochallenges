import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Relation,
} from "typeorm";
import { Challenge } from "./Challenge";
import { UserChallenge } from "./UserChallenge";

export enum Role {
  USER = "USER",
}

registerEnumType(Role, {
  name: "Roles",
  description: "Roles for users in this app",
});

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ type: "enum", enum: Role, array: true, default: [Role.USER] })
  @Field(() => [Role])
  roles: Role[];

  @OneToMany(() => Challenge, (challenge) => challenge.createdBy)
  challengesCreated: Relation<Challenge[]>;

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.user)
  participations: Relation<UserChallenge[]>;
}
