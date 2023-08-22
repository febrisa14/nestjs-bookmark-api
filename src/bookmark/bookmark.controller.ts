import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) { }

  @Post()
  async create(@Body() createBookmarkDto: CreateBookmarkDto, @GetUser('id') userId: number) {
    return await this.bookmarkService.create(createBookmarkDto, userId);
  }

  @Get()
  async findAll(@GetUser('id') userId: number) {
    const data = await this.bookmarkService.findAll(userId)
    return {
      data,
      message: 'Get All Bookmark Users'
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser('id') userId: number) {
    return await this.bookmarkService.findOne(+id, userId);
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
