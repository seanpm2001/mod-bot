import onboardCommand, { handler as onboardHandler } from "~/commands/setup";

import automod from "~/discord/automod";
import onboardGuild from "~/discord/onboardGuild";
import { client, login } from "./client";

export default function init() {
  login();

  client.on("ready", () => {
    onboardGuild(client);
    automod(client);
  });

  client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand()) {
      switch (interaction.commandName) {
        case onboardCommand.name:
          return onboardHandler(interaction);
      }
    }
  });

  client.on("messageReactionAdd", () => {});

  client.on("threadCreate", (thread) => {
    thread.join();
  });

  client.on("messageCreate", async (msg) => {
    if (msg.author?.id === client.user?.id) return;

    //
  });

  const errorHandler = (error: unknown) => {
    if (error instanceof Error) {
      console.log("ERROR", error.message);
    } else if (typeof error === "string") {
      console.log("ERROR", error);
    }
  };

  client.on("error", errorHandler);
  process.on("uncaughtException", errorHandler);
  process.on("unhandledRejection", errorHandler);
}
