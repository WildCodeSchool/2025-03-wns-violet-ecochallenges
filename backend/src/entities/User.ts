import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  //   @Column()
  //   hashedPassword: string;
}
