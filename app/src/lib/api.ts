import ky from "ky";

export type CommandError = {
  status: "failed";
  error: { exitCode: number; stdout: string; stderr: string; name: string };
};
export type CommandOutput = { status: "success"; result: string };
export type SendResult = CommandError | CommandOutput;

export async function sendCommand(command: string) {
  const result = await ky
    .post<SendResult>("http://localhost:8080/send", {
      json: { command: command },
    })
    .json();

  return result;
}
