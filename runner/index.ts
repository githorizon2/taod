import { $ } from "bun";
import pino from "pino";
import cors from "cors";
import express from "express";

const port = Bun.env.PORT ?? 8080;
const logger = pino();
const app = express();

app.use(express.json());
app.use(cors());

async function sendCommand(value: string) {
  try {
    logger.debug(`running command: ${value}`);
    const result = await $`${value}`;
    return { status: "success", result };
  } catch (error) {
    logger.error({ message: "command resulted error", error });
    return { status: "failed", error };
  }
}

app.post("/send", async (req, res) => {
  const command = req.body?.command;
  if (command) {
    logger.info(`received send reqeuest with: ${command}`);
    const result = await sendCommand(command);
    res.send(result);
  } else {
    logger.warn("recieved sedn reqeust without command parameter");
    res.status(400).send('missing parameter "command" in request body');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
