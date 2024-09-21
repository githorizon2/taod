import ky from "ky";

export type CommandOutput = { result: string };

export async function sendCommand(command: string) {
  const result = await ky
    .post<CommandOutput>("http://localhost:8080/send", {
      json: { command: command },
    })
    .json();

  return result;
}
