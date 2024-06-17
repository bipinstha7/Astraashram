import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import BaseEntity from 'src/utils/baseEntity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty({ type: String })
  @Column()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;
}
