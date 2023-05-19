package rocket

import (
	"encoding/json"
	"fmt"
	"github.com/somnoynadno/zhumaysynba/internal/telemetry/log"
	"io"
	"net/http"
	"net/url"
)

type BotIntegration struct {
	URL            string
	WebRedirectURL string
}

func NewBotIntegration(url, webRedirectURL string) *BotIntegration {
	return &BotIntegration{
		URL:            url,
		WebRedirectURL: webRedirectURL,
	}
}

func (b *BotIntegration) SendMessage(message, messageType, recipient string) error {
	logger := log.NewLogger()

	data := url.Values{
		"recipient":    {recipient},
		"message_text": {message},
		"type":         {messageType},
	}

	resp, err := http.PostForm(fmt.Sprintf("%s/send_message", b.URL), data)
	if err != nil {
		logger.Error(err.Error())
		return err
	}

	logger.Info("message sent: " + resp.Status)
	defer func(Body io.ReadCloser) {
		_ = Body.Close()
	}(resp.Body)

	var res map[string]interface{}

	_ = json.NewDecoder(resp.Body).Decode(&res)
	return nil
}
