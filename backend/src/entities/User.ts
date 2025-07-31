import { Field, ObjectType, registerEnumType } from "type-graphql";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
