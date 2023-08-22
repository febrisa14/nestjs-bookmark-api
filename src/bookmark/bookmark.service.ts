import { Injectable, ForbiddenException, HttpException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bookmark, Prisma } from '@prisma/client';
import { STATUS_CODES } from 'http';

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

  async findOne(id: number, userId: number): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id
      }
    })

    if (!bookmark) {
      throw new HttpException("Bookmark not found", 404)
    }

    if (bookmark.userId !== userId) {
      throw new ForbiddenException("This action is unauthorized")
    }

    return bookmark;
  }

  async update(id: number, updateBookmarkDto: UpdateBookmarkDto, userId: number): Promise<Bookmark> {
    await this.findOne(id, userId);

    const bookmark = await this.prisma.bookmark.update({
      where: {
        id
      },
      data: {
        title: updateBookmarkDto.title,
        description: updateBookmarkDto.description,
        link: updateBookmarkDto.link,
      },
      include: {
        user: {
          select: this.userBookmarkSelect
        }
      }
    })

    return bookmark;
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}
