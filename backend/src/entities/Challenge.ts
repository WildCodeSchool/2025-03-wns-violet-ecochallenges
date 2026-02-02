import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { UserChallenge } from "./UserChallenge";

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  label: string;

  @Column({ type: "timestamp" })
  @Field()
  startingDate: Date;

  @Column({ type: "timestamp" })
  @Field()
  endingDate: Date;

  @Column()
  @Field()
  picture: string;

  @ManyToOne(() => User, (user) => user.challengesCreated)
  @Field(() => User)
  createdBy: User;

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.challenge)
  @Field(() => [UserChallenge])
  participants: Relation<UserChallenge[]>;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
