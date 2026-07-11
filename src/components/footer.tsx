const Footer = () => {
  const tiktokURL = "https://www.tiktok.com/@wingnight_ow";
  const twitchURL = "https://www.twitch.tv/wingnightOW";
  const discordURL = "https://discord.gg/p94gYf8vsM";

  return (
    <footer className="footer fixed-bottom mt-auto mb-2 bg-body-tertiary">
      <br />
      <div className="container">
        <div className="row">
          <div className="col text-start">
            <p className="text-body-tertiary">
              Developed by <a href={tiktokURL} className="text-info text-decoration-none">@wingnight_ow</a>
            </p>
          </div>
          <div className="col text-end">
            <a href={tiktokURL} className="p-2 fs-5" target="_blank" aria-label="TikTok"><i className="bi bi-tiktok text-body-tertiary"></i></a>
            <a href={discordURL} className="p-2 fs-5" target="_blank" aria-label="TikTok"><i className="bi bi-discord text-body-tertiary"></i></a>
            <a href={twitchURL} className="p-2 fs-5" target="_blank" aria-label="Twitch"><i className="bi bi-twitch text-body-tertiary"></i></a>
            <a href="mailto:wingnightow@gmail.com" target="_blank" className="p-2 fs-5" aria-label="Email"><i className="bi bi-envelope-fill text-body-tertiary"></i></a>
          </div>
        </div>
      </div>
    </footer>
  )

}

export default Footer;