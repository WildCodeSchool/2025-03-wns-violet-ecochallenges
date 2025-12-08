import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Ecogesture } from "./Ecogesture";

@Entity()
export class UserEcogesture {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public userId: number;

  @Column()
  public ecogestureId: number;

  @Column()
  public validated_at: Date;

  @Column()
  public level_validated: number;

  @ManyToOne(() => User, (user) => user.UserEcogesture)
  public user: User;

  @ManyToOne(() => Ecogesture, (ecogesture) => ecogesture.UserEcogesture)
  public ecogesture: Ecogesture;
}
