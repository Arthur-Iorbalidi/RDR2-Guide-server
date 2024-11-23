import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Arthur', description: 'User name' })
  readonly name: string;
  @ApiProperty({ example: 'Iorbalidi', description: 'User surname' })
  readonly surname: string;
  @ApiProperty({
    example: 'arthur.iorbalidi@gmail.com',
    description: 'User email',
  })
  readonly email: string;
  @ApiProperty({ example: '1111', description: 'User password' })
  readonly password: string;
}
