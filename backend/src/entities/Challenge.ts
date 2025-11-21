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

  @Column({ type: "timestamp" })
  @Field()
  startingDate: Date;

  @Column({ type: "timestamp" })
  @Field()
  endingDate: Date;

  @Column()
  @Field()
  picture: string;
}
