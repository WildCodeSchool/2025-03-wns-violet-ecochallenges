import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { UserChallenge } from "./UserChallenge";
import { Ecogesture } from "./Ecogesture";
import { Expose } from "class-transformer";

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
  pictureUrl: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.challengesCreated)
  @Field(() => User)
  createdBy: User;

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.challenge)
  @Field(() => [UserChallenge])
  participants: Relation<UserChallenge[]>;

  @ManyToMany(() => Ecogesture, (ecogesture) => ecogesture.challenges)
  @JoinTable()
  @Field(() => [Ecogesture], { nullable: true })
  ecogestures?: Ecogesture[];

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  @Field(() => Number, { nullable: true })
  @Expose()
  progressPercentage: number = 0;
}
