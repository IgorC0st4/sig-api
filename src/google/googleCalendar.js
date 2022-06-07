const { google } = require('googleapis');

const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URI,
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_OAUTH_REFRESH_TOKEN,
  access_token: process.env.GOOGLE_OAUTH_ACCESS_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const inserirNovoEvento = (
  inicioDoEvento = new Date(),
  fimDoEvento = new Date(),
  descricao = '',
  titulo = '',
  cliente = { email: '', nome: '' },
) => {
  const event = {
    summary: titulo,
    description: descricao,
    creator: { email: cliente.email, displayName: cliente.nome },
    start: {
      dateTime: inicioDoEvento,
      timeZone: 'America/Sao_Paulo',
    },
    end: {
      dateTime: fimDoEvento,
      timeZone: 'America/Sao_Paulo',
    },
  };

  return calendar.events.insert({
    auth: oAuth2Client,
    calendarId: 'primary',
    resource: event,
    requestBody: event,
  });
};

const listarEventosNoIntervalo = (
  inicio = new Date(),
  fim = new Date(),
) => calendar.events.list({
  auth: oAuth2Client,
  calendarId: 'primary',
  timeMin: inicio,
  timeMax: fim,
});

module.exports = {
  inserirNovoEvento,
  listarEventosNoIntervalo,
};
