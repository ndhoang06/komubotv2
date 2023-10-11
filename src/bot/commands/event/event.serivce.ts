import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClientConfigService } from "src/bot/config/client-config.service";
import { EventEntity } from "src/bot/models/event.entity";
import { KomubotrestService } from "src/bot/utils/komubotrest/komubotrest.service";
import { Repository } from "typeorm";

@Injectable()
export class EventService {
    constructor(
        private clientConfig: ClientConfigService,
        private komubotrestService: KomubotrestService,
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
    ) { }

    async saveEvent(title, createdTimestamp, user,) {
        await this.eventRepository.insert({
            title: title,
            createdTimestamp: createdTimestamp,
            user: user
        });
    }

    async cancelEventById(id) {
        return await this.eventRepository
            .createQueryBuilder("meeting")
            .update(EventEntity)
            .set({
                cancel: true,
            })
            .where(`"id" = :id`, { id: id })
            .execute();
    }
}