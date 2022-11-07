import { PartialType } from '@nestjs/mapped-types';
import { CreateUserBackupDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserBackupDto) {}
