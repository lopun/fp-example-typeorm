import bcrypt from "bcrypt";
import { IsEmail } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import Abstract from "./Abstract";
const BCRYPT_ROUNDS = 10;

@Entity()
class User extends Abstract {
  @Column({ type: "text", nullable: true })
  @IsEmail()
  email: string | null;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text", select: false })
  password: string;

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashedPassword = await this.hashPassword(this.password);
      this.password = hashedPassword;
      console.log(this.password);
    }
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }
}

export default User;
