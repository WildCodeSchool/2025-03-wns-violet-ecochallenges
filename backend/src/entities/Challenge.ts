import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class Challenge extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  label: string;

  @Column({type: "date"})
  @Field()
  startingDate: Date;

  @Column({type: "date"})
  @Field()
  endingDate: Date;

  @Column()
  @Field()
  picture: string;
}
