import { Logger, LogLevel } from "@sapphire/framework";

export class NewLogger implements Logger {
	public level: LogLevel;

	public constructor(level: LogLevel) {
		this.level = level;
	}

	public has(level: LogLevel): boolean {
		return level >= this.level;
	}

	public trace(...values: readonly unknown[]): void {
		this.write(LogLevel.Trace, ...values);
	}

	public debug(...values: readonly unknown[]): void {
		this.write(LogLevel.Debug, ...values);
	}

	public info(...values: readonly unknown[]): void {
		this.write(LogLevel.Info, ...values);
	}

	public warn(...values: readonly unknown[]): void {
		this.write(LogLevel.Warn, ...values);
	}

	public error(...values: readonly unknown[]): void {
		this.write(LogLevel.Error, ...values);
	}

	public fatal(...values: readonly unknown[]): void {
		this.write(LogLevel.Fatal, ...values);
	}

	public write(level: LogLevel, ...values: readonly unknown[]): void {
    console.log(level)
    console.log(`${level}`, ...values)
	}

}
