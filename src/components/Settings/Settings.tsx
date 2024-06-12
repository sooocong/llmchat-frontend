import React, { useEffect, useRef, useState } from 'react';
import styles from './Settings.module.css';
import settings_icon from '../../assets/settings_icon.png';
import settings_basic from '../../assets/settings_basic.png';
import settings_sound from '../../assets/settings_sound.png';
import settings_personal from '../../assets/settings_personal.png';
import settings_version from '../../assets/settings_version.png';
import settings_select from '../../assets/settings_select.png';
import axios from 'axios';

function Settings({
  openSettings,
  closeSettings,
}: {
  openSettings: boolean;
  closeSettings: () => void;
}) {
  const url = 'https://api.aero-chat.com';
  const token =
    window.localStorage.getItem('token') ||
    window.sessionStorage.getItem('token');
  const [tabState, setTabState] = useState<number>(1);
  const localTheme = window.localStorage.getItem('theme') || 'LIGHT';
  const [theme, setTheme] = useState(localTheme);
  const localLanguage = window.localStorage.getItem('language') || 'ko';
  const [language, setLanguage] = useState<string>(() => {
    if (localLanguage === 'ko') {
      return '한국어';
    } else if (localLanguage === 'de') {
      return 'Deutsch';
    } else if (localLanguage === 'en') {
      return 'English (US)';
    } else if (localLanguage === 'es') {
      return 'Español';
    } else if (localLanguage === 'fr') {
      return 'Français';
    } else if (localLanguage === 'ja') {
      return '日本語';
    } else if (localLanguage === 'pt') {
      return 'Português';
    } else if (localLanguage === 'ru') {
      return 'Русский';
    } else if (localLanguage === 'zh-cht') {
      return '繁體中文（香港）';
    } else {
      return '繁體中文（台灣）';
    }
  });

  const localVoice = window.localStorage.getItem('voice') || 'FEMALE';
  const [voice, setVoice] = useState(localVoice);
  const [userMessage, setUserMessage] = useState<string>(
    window.localStorage.getItem('userMsg') || ''
  );
  const [modelMessage, setModelMessage] = useState<string>(
    window.localStorage.getItem('modelMsg') || ''
  );
  const [userMessageCnt, setUserMessageCnt] = useState<number>(
    userMessage.length
  );
  const [modelMessageCnt, setModelMessageCnt] = useState<number>(
    modelMessage.length
  );
  const [messageEnabled, setMessageEnabled] = useState<boolean>(false);
  const localVersion = window.localStorage.getItem('version') || '1.0';
  const [version, setVersion] = useState(localVersion);
  const languages = [
    '한국어',
    'Deutsch',
    'English (US)',
    'Español',
    'Français',
    '日本語',
    'Português',
    'Русский',
    '繁體中文（香港）',
    '繁體中文（台灣）',
  ];
  const remainingLanguages = languages.filter((lang) => lang !== language);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const handleTab = (idx: React.SetStateAction<number>) => {
    setTabState(idx);
    setActiveModal(null);
  };

  const handleTheme = (theme: string) => {
    setTheme(theme);
    window.localStorage.setItem('theme', theme);
    setActiveModal(null);
  };

  const handleVoice = (voice: string) => {
    setVoice(voice);
    window.localStorage.setItem('voice', voice);
    setActiveModal(null);
  };

  const handleCheckboxChange = () => {
    setMessageEnabled(!messageEnabled);
  };

  const handleLanguage = (language: string) => {
    setLanguage(language);
    if (language === '한국어') {
      window.localStorage.setItem('language', 'ko');
    } else if (language === 'Deutsch') {
      window.localStorage.setItem('language', 'de');
    } else if (language === 'English (US)') {
      window.localStorage.setItem('language', 'en');
    } else if (language === 'Español') {
      window.localStorage.setItem('language', 'es');
    } else if (language === 'Français') {
      window.localStorage.setItem('language', 'fr');
    } else if (language === '日本語') {
      window.localStorage.setItem('language', 'ja');
    } else if (language === 'Português') {
      window.localStorage.setItem('language', 'pt');
    } else if (language === 'Русский') {
      window.localStorage.setItem('language', 'ru');
    } else if (language === '繁體中文（香港）') {
      window.localStorage.setItem('language', 'zh-cht');
    } else {
      window.localStorage.setItem('language', 'zh-chs');
    }
    setActiveModal(null);
  };

  const handleVersion = (version: string) => {
    setVersion(version);
    window.localStorage.setItem('version', version);
    setActiveModal(null);
  };

  const chkDelete = () => {
    if (confirm('모든 채팅 기록을 지우시겠습니까?') === true) {
      axios
        .delete(`${url}/api/v1/chat/thread/soft-delete-all`, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            closeSettings();
          } else {
            alert('삭제에 실패하였습니다.');
          }
        });
    }
  };

  const saveSettings = () => {
    const settingsBody = {
      uiTheme: window.localStorage.getItem('theme'),
      uiLanguageCode: window.localStorage.getItem('language'),
      speechVoice: window.localStorage.getItem('voice'),
      aboutModelMessage: modelMessage,
      aboutUserMessage: userMessage,
      aboutMessageEnabled: messageEnabled,
      modelVersion: 'GPT_3_5',
    };
    axios
      .post(`${url}/api/v1/user/preference`, settingsBody, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          closeSettings();
        } else {
          alert('설정 변경에 실패하였습니다.');
        }
      });
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    axios
      .get(`${url}/api/v1/user/preference`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem('theme', response.data.uiTheme);
          window.localStorage.setItem('language', response.data.uiLanguageCode);
          window.localStorage.setItem('voice', response.data.speechVoice);
          window.localStorage.setItem(
            'userMsg',
            response.data.aboutUserMessage
          );
          window.localStorage.setItem(
            'modelMsg',
            response.data.aboutModelMessage
          );
          setMessageEnabled(response.data.aboutMessageEnabled);
        }
      });
    setUserMessage(window.localStorage.getItem('userMsg') || '');
    setModelMessage(window.localStorage.getItem('modelMsg') || '');

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        openSettings &&
        modalRef.current &&
        !modalRef.current.contains(target)
      ) {
        closeSettings();
        setActiveModal(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [token, openSettings, closeSettings]);

  return (
    <div className={openSettings ? styles.modal : styles.closeModal}>
      <div className={styles.settings_modal} ref={modalRef}>
        <div className={styles.settings_top}>
          <img
            className={styles.settings_icon}
            src={settings_icon}
            alt="settings"
          />
          <div className={styles.settings_title}>
            <h1 className={styles.settings_title_txt}>설정</h1>
          </div>
          <button className={styles.btn_close} onClick={closeSettings}>
            X
          </button>
        </div>
        <div className={styles.settings_detail}>
          <div className={styles.settings_tab}>
            <div
              className={
                tabState === 1
                  ? styles.settings_tab_menu_active
                  : styles.settings_tab_menu
              }
              onClick={() => handleTab(1)}
            >
              <img
                className={styles.settings_basic}
                src={settings_basic}
                alt="basic"
              />
              <h1 className={styles.settings_tab_txt}>기본</h1>
            </div>
            <div
              className={
                tabState === 2
                  ? styles.settings_tab_menu_active
                  : styles.settings_tab_menu
              }
              onClick={() => handleTab(2)}
            >
              <img
                className={styles.settings_basic}
                src={settings_sound}
                alt="basic"
              />
              <h1 className={styles.settings_tab_txt}>소리</h1>
            </div>
            <div
              className={
                tabState === 3
                  ? styles.settings_tab_menu_active
                  : styles.settings_tab_menu
              }
              onClick={() => handleTab(3)}
            >
              <img
                className={styles.settings_basic}
                src={settings_personal}
                alt="basic"
              />
              <h1 className={styles.settings_tab_txt}>맞춤 설정</h1>
            </div>
            <div
              className={
                tabState === 4
                  ? styles.settings_tab_menu_active
                  : styles.settings_tab_menu
              }
              onClick={() => handleTab(4)}
            >
              <img
                className={styles.settings_basic}
                src={settings_version}
                alt="basic"
              />
              <h1 className={styles.settings_tab_txt}>버전</h1>
            </div>
          </div>
          <div className={styles.settings_content}>
            <div
              className={
                tabState === 1
                  ? styles.settings_content_active
                  : styles.settings_content_detail
              }
            >
              <div className={styles.settings_option}>
                <p>테마</p>
                <button
                  className={styles.btn_option}
                  onClick={() =>
                    setActiveModal(activeModal === 'theme' ? null : 'theme')
                  }
                >
                  <span className={styles.selected_option}>
                    {theme === 'LIGHT' ? '라이트 모드' : '다크 모드'}
                  </span>
                  <span className={styles.select_arrow}>
                    <img
                      className={styles.select_arrow_icon}
                      src={settings_select}
                      alt="arrow"
                    />
                  </span>
                </button>
                <div
                  className={
                    activeModal === 'theme'
                      ? styles.settings_theme
                      : styles.closeModal
                  }
                >
                  <div>
                    <span
                      className={styles.option_box}
                      onClick={() => {
                        handleTheme('LIGHT');
                      }}
                    >
                      라이트 모드
                    </span>
                    <span
                      className={styles.option_box}
                      onClick={() => {
                        handleTheme('DARK');
                      }}
                    >
                      다크 모드
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.settings_option}>
                <p>언어</p>
                <button
                  className={styles.btn_option}
                  onClick={() =>
                    setActiveModal(
                      activeModal === 'language' ? null : 'language'
                    )
                  }
                >
                  <span className={styles.selected_option}>{language}</span>
                  <span className={styles.select_arrow}>
                    <img
                      className={styles.select_arrow_icon}
                      src={settings_select}
                      alt="arrow"
                    />
                  </span>
                </button>
                <div
                  className={
                    activeModal === 'language'
                      ? styles.settings_language
                      : styles.closeModal
                  }
                >
                  <div className={styles.selected_language}>
                    <span
                      className={styles.option_box}
                      onClick={() => {
                        handleLanguage(language);
                      }}
                    >
                      {language}
                    </span>
                  </div>
                  <div className={styles.language_option}>
                    {remainingLanguages.map((language, index) => (
                      <span
                        key={index}
                        className={styles.option_box}
                        onClick={() => {
                          handleLanguage(language);
                        }}
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.settings_option}>
                <p>모든 채팅 삭제하기</p>
                <button className={styles.btn_delete} onClick={chkDelete}>
                  모두 삭제
                </button>
              </div>
            </div>
            <div
              className={
                tabState === 2
                  ? styles.settings_content_active
                  : styles.settings_content_detail
              }
            >
              <div className={styles.settings_option}>
                <p>음성</p>
                <button
                  className={styles.btn_option}
                  onClick={() =>
                    setActiveModal(activeModal === 'voice' ? null : 'voice')
                  }
                >
                  <span className={styles.selected_option}>
                    {voice === 'MALE' ? '남성' : '여성'}
                  </span>
                  <span className={styles.select_arrow}>
                    <img
                      className={styles.select_arrow_icon}
                      src={settings_select}
                      alt="arrow"
                    />
                  </span>
                </button>
                <div
                  className={
                    activeModal === 'voice'
                      ? styles.settings_voice
                      : styles.closeModal
                  }
                >
                  <div>
                    <span
                      className={styles.option_box}
                      onClick={() => {
                        handleVoice('MALE');
                      }}
                    >
                      남성
                    </span>
                    <span
                      className={styles.option_box}
                      onClick={() => {
                        handleVoice('FEMALE');
                      }}
                    >
                      여성
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                tabState === 3
                  ? styles.settings_content_active
                  : styles.settings_content_detail
              }
            >
              <div>
                <div>
                  <p className={styles.settings_personal_txt}>
                    Fasoo Chat이 더 나은 응답을 제공해 드리기 위해 사용자님에
                    대해 알아두어야 할 것이
                    <br />
                    있다면 무엇인가요?
                  </p>
                  <textarea
                    className={styles.settings_personal_txtarea}
                    onChange={(e) => {
                      setUserMessageCnt(e.target.value.length);
                      setUserMessage(e.target.value);
                      window.localStorage.setItem('userMsg', e.target.value);
                    }}
                    maxLength={1500}
                    value={userMessage}
                  />

                  <p className={styles.settings_personal_txtarea_cnt}>
                    <span>{userMessageCnt}</span>
                    <span>/1500</span>
                  </p>
                </div>
                <div>
                  <p className={styles.settings_personal_txt}>
                    Fasoo Chat이 어떻게 응답했으면 하시나요?
                  </p>
                  <textarea
                    className={styles.settings_personal_txtarea}
                    onChange={(e) => {
                      setModelMessageCnt(e.target.value.length);
                      setModelMessage(e.target.value);
                      window.localStorage.setItem('modelMsg', e.target.value);
                    }}
                    maxLength={1500}
                    value={modelMessage}
                  />
                  <p className={styles.settings_personal_txtarea_cnt}>
                    <span>{modelMessageCnt}</span>
                    <span>/1500</span>
                  </p>
                </div>
                <div className={styles.settings_personal_section}>
                  <p className={styles.settings_personal_chk_txt}>
                    새 채팅에 적용
                  </p>
                  <input
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={messageEnabled}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                tabState === 4
                  ? styles.settings_content_active
                  : styles.settings_content_detail
              }
            >
              <div className={styles.settings_option}>
                <p>버전</p>
                <button
                  className={styles.btn_option}
                  onClick={() =>
                    setActiveModal(activeModal === 'version' ? null : 'version')
                  }
                >
                  <span className={styles.selected_option}>{version}</span>
                  <span className={styles.select_arrow}>
                    <img
                      className={styles.select_arrow_icon}
                      src={settings_select}
                      alt="arrow"
                    />
                  </span>
                </button>
                <div
                  className={
                    activeModal === 'version'
                      ? styles.settings_version
                      : styles.closeModal
                  }
                >
                  <span
                    className={styles.version_option}
                    onClick={() => {
                      handleVersion('1.0');
                    }}
                  >
                    <p>1.0</p>
                    <p className={styles.version_desc_txt}>
                      Fasoo Chat의 초기 버전이자 기본버전
                      <br />
                      일상적 대화에 특화
                    </p>
                  </span>
                  <span
                    className={styles.version_option}
                    onClick={() => {
                      handleVersion('1.5');
                    }}
                  >
                    <p>1.5</p>
                    <p className={styles.version_desc_txt}>
                      Fasoo Chat의 베타버전
                      <br />
                      사용자 맞춤 서비스에 특화
                    </p>
                  </span>
                </div>
              </div>
            </div>
            <button className={styles.btn_save} onClick={saveSettings}>저장</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
