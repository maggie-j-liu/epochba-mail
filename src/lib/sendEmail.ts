export const sendEmail = async ({
  to,
  from,
  subject,
  htmlContent,
  textContent,
  // privateKey,
  bccTeam,
}: {
  to: string[];
  from?: string;
  subject: string;
  htmlContent: string;
  textContent: string;
  // privateKey: string;
  bccTeam: boolean;
}) => {
  console.log(
    "sending to",
    JSON.stringify(
      to.length === 1
        ? [{ email: to[0] }]
        : [{ email: "test-team@epochba.hackclub.com" }]
    )
  );
  const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to:
            to.length === 1
              ? [{ email: to[0] }]
              : [{ email: "test-team@epochba.hackclub.com" }],
          bcc:
            to.length === 1
              ? bccTeam
                ? [{ email: "test-team@epochba.hackclub.com" }]
                : []
              : [...to.map((e) => ({ email: e }))],
          // dkim_domain: "epochba.hackclub.com",
          // dkim_private_key: privateKey,
          // dkim_selector: "mailchannels",
        },
      ],
      from: from
        ? { email: from }
        : {
            name: "Epoch BA Team",
            email: "team@epochba.hackclub.com",
          },
      subject,
      content: [
        {
          type: "text/plain",
          value: textContent,
        },
        {
          type: "text/html",
          value: htmlContent,
        },
      ],
    }),
  });
  const message = await res.text();
  console.log(res.status);
  console.log(message);
  return res;
};
