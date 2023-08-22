import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bookmark, Prisma } from '@prisma/client';

@Injectable({})
export class BookmarkService {
  constructor(
    private prisma: PrismaService,
  ) { }

  private userBookmarkSelect: Prisma.UserSelect = {
    id: true,
    firstName: true,
    lastName: true,
    email: true
  }

  async create(createBookmarkDto: CreateBookmarkDto, userId: number): Promise<Bookmark> {
    try {
      const userBookmark = await this.prisma.bookmark.create({
        data: {
          title: createBookmarkDto.title,
          description: createBookmarkDto.description,
          link: createBookmarkDto.link,
          user: {
            connect: { id: userId },
          },
        },
        include: {
          user: {
            select: this.userBookmarkSelect
          }
        }
      })

      return userBookmark;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(userId: number): Promise<Bookmark[]> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        user: {
          id: userId
        }
      },
      include: {
        user: {
          select: this.userBookmarkSelect
        }
      }
    })

    return bookmarks;
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
