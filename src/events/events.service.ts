import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { PER_PAGE_DEFAULT } from './contants/pagination.constants';
import { EventDetailsDto } from './dto/event-details.dto';
import { EventFindAllQueryDto } from './dto/event-find-all-query.dto';
import { EventDto } from './dto/event.dto';
import { EventPaginationDto } from './dto/events-pagination.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event)
    private eventModel: typeof Event,
  ) {}

  async findAll({ userId, page = 1, limit = PER_PAGE_DEFAULT }: EventFindAllQueryDto): Promise<EventPaginationDto> {
    const userIdFilter = userId ? { where: { userId } } : {};
    const paginationFiler = { limit, offset: limit * (page - 1) };
    const orderFilter = { order: ['startDate', 'endDate'] };
    const filters = { ...userIdFilter, ...paginationFiler, ...orderFilter };
    const { rows, count } = await this.eventModel.findAndCountAll(filters);
    const pagesCount = Math.ceil(count / limit);
    if (page > 1 && page > pagesCount) throw new BadRequestException('This page does not exists');
    return { currentPage: page, pagesCount, events: rows };
  }

  async findById(id: number): Promise<EventDto> {
    const event = await this.eventModel.findByPk(id);
    if (!event) throw new NotFoundException();
    return event;
  }

  async create(details: EventDetailsDto, userId: number): Promise<EventDto> {
    return this.eventModel.create({ ...details, userId });
  }

  async update(id: number, details: UpdateEventDto, userId: number): Promise<EventDto> {
    const event = await this.eventModel.findByPk(id);
    if (!event) throw new NotFoundException();
    if (event.userId !== userId) throw new ForbiddenException();
    event.update(details);
    await event.save();
    return event;
  }

  async delete(id: number, userId: number) {
    const event = await this.eventModel.findByPk(id);
    if (!event) throw new NotFoundException();
    if (event.userId !== userId) throw new ForbiddenException();
    await event.destroy();
  }

  async deleteCompleted() {
    const dateString = new Date().toISOString().split('T')[0];
    await this.eventModel.destroy({ where: { endDate: { [Op.lt]: dateString } } });
  }
}
