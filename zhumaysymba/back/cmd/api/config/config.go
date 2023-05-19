package config

type Config struct {
	DB struct {
		Host     string `envconfig:"DB_HOST"`
		Port     int    `envconfig:"DB_PORT"`
		User     string `envconfig:"DB_USER"`
		Password string `envconfig:"DB_PASSWORD"`
		Name     string `envconfig:"DB_NAME"`
	}

	Server struct {
		Host string `envconfig:"SERVER_HOST"`
		Port int    `envconfig:"SERVER_PORT"`
	}

	RocketBot struct {
		URL            string `envconfig:"ROCKET_BOT_URL"`
		WebRedirectURL string `envconfig:"ROCKET_BOT_WEB_REDIRECT_URL"`
	}
}
