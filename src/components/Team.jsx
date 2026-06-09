import { useLang } from '../i18n/LangContext'
import Reveal from './Reveal'
import { TEAM } from '../data/team'

export default function Team({ variant }) {
  const { t, lang } = useLang()
  const cls = `section about-team${variant ? ` about-team--${variant}` : ''}`

  return (
    <section className={cls} id="equipo" data-screen-label="Equipo">
      <div className="wrap">
        <Reveal as="p" className="eyebrow">
          {t('about.team.eyebrow')}
        </Reveal>

        <div className="about-team-intro">
          <Reveal as="h2" delay={1} className="about-team-title">
            {t('about.team.title')}
          </Reveal>
          <Reveal as="p" delay={2} className="about-team-lead">
            {t('about.team.lead')}
          </Reveal>
        </div>

        <div className="team-grid">
          {TEAM.map((member, i) => (
            <Reveal className="team-card" delay={i} key={member.id}>
              <div className="team-avatar" aria-hidden="true">
                {member.photo ? (
                  <img src={member.photo} alt="" />
                ) : (
                  <span>{member.initials}</span>
                )}
              </div>
              <h3>{member.name[lang] || member.name.es}</h3>
              <p className="team-role">{member.role[lang] || member.role.es}</p>
              <p className="team-bio">{member.bio[lang] || member.bio.es}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
