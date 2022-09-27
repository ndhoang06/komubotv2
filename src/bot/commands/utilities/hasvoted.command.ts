import { CommandLine, CommandLineClass } from "src/bot/base/command.base";
import { ClientConfigService } from "src/bot/config/client-config.service";

@CommandLine({
  name: "vote",
  description: "Shows if you voted the bot in the last 12h",
})
export class HasvotedCommand implements CommandLineClass {
  constructor(private readonly clientConfigService: ClientConfigService) {}

  async execute(message, args, client) {
    // if (!this.clientConfigService.links.topgg_url) {
    //   return message.erroMessage(
    //     'This command is currently disabled beacause i am not on top.gg yet :)'
    //   );
    // }
    const voted = await client.dbl.hasVoted(message.member.id);
    message.channel.send({
      embeds: [
        {
          author: {
            name: message.member.user.username,
            icon_url: message.member.user.displayAvatarURL({
              dynamic: true,
              size: 512,
            }),
            url: process.env.LINKS_INVITE,
          },
          description: `${
            voted
              ? "You have already voted for me in the last 12h"
              : "You haven't for me in the last 12h"
          }\nYou can vote me by [Clicking here](
                `,
          //  ${
          //   this.clientConfigService.links.topgg_url
          // }/vote
          // ).
          color: "#3A871F",
          footer: {
            text: `${message.client.footer}`,
            icon_url: message.client.user.displayAvatarURL({
              dynamic: true,
              size: 512,
            }),
          },
        },
      ],
    });
  }
}