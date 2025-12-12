import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ecogesture } from "./Ecogesture";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserEcogesture extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  public id: number;

  @Column()
  @Field()
  public userId: number;

  @Column()
  @Field()
  public ecogestureId: number;

  @Column()
  @Field()
  public validated_at: Date;

  @Column()
  @Field()
  public level_validated: number;

  @ManyToOne(() => User, (user) => user.UserEcogesture)
  @Field(() => User) 
  public user: User;

  @ManyToOne(() => Ecogesture, (ecogesture) => ecogesture.UserEcogesture)
  @Field(() => Ecogesture)
  public ecogesture: Ecogesture;
}
