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
      message: 'Retrieve Data All Bookmark Users'
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser('id') userId: number) {
    return {
      data: await this.bookmarkService.findOne(+id, userId),
      message: 'Retrieve Data By Id Bookmark User'
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookmarkDto: UpdateBookmarkDto, @GetUser('id') userId: number) {
    return {
      data: await this.bookmarkService.update(+id, updateBookmarkDto, userId),
      messsage: 'Update Bookmark By Id Successfully'
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: number) {
    return this.bookmarkService.remove(+id, userId);
  }
}
