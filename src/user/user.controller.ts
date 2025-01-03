import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUserById(@GetUser('id') userId: number) {
    return this.userService.getUserById(userId);
  }

  @Patch()
  editUserName(@Body() dto: EditUserDto, @GetUser('id') userId: number) {
    return this.userService.editUserName(dto, userId);
  }
}
