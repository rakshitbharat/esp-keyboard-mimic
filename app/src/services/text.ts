import { configService } from "./config";

export class TextService {
  private getRandomDelay(): number {
    const { typingDelay, useRandomDelay, randomDelayRange } =
      configService.getConfig();

    if (!useRandomDelay) {
      return typingDelay;
    }

    const [min, max] = randomDelayRange;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public async simulateTyping(
    text: string,
    onProgress: (progress: number) => void
  ): Promise<void> {
    const chunks = text.match(/.{1,20}|.+/g) || [];
    const totalChunks = chunks.length;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      await new Promise((resolve) =>
        setTimeout(resolve, this.getRandomDelay())
      );

      // Calculate and report progress
      const progress = Math.round(((i + 1) / totalChunks) * 100);
      onProgress(progress);
    }
  }

  public formatText(text: string): string {
    // Remove extra whitespace and normalize line endings
    return text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\s+/g, " ")
      .trim();
  }

  public splitIntoChunks(text: string, chunkSize: number = 20): string[] {
    return text.match(new RegExp(`.{1,${chunkSize}}`, "g")) || [];
  }
}
