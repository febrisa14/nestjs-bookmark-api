import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable({})
export class BookmarkService {
  constructor(
    private prisma: PrismaService,
  ) { }

  async create(createBookmarkDto: CreateBookmarkDto, user: User) {
    try {
      const userBookmark = await this.prisma.bookmark.create({
        data: {
          title: createBookmarkDto.title,
          description: createBookmarkDto.description,
          link: createBookmarkDto.link,
          user: {
            connect: { id: user.id },
          },
        },
      })

      return {
        data: userBookmark,
        message: "Bookmark store successfully"
      }
    } catch (error) {
      console.log(error);
    }
  }

  findAll() {
    return `This action returns all bookmark`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookmark`;
  }

  update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
    return `This action updates a #${id} bookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}
