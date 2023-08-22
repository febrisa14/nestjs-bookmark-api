import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) { }

  @Post()
  async create(@Body() createBookmarkDto: CreateBookmarkDto, @GetUser() user: User) {
    return await this.bookmarkService.create(createBookmarkDto, user);
  }

  @Get()
  findAll() {
    return this.bookmarkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookmarkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkService.update(+id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookmarkService.remove(+id);
  }
}
