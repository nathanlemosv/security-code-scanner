package logger

import (
	"log/slog"
	"os"
)

var Log *slog.Logger

func init() {
	handler := slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
		Level:     slog.LevelInfo,
		AddSource: true,
	})
	Log = slog.New(handler)
	slog.SetDefault(Log)
}
