import { Column, Entity } from 'typeorm';
import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
