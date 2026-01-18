import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              Политика конфиденциальности
            </h1>
            
            <div className="space-y-8 text-muted-foreground">
              <Card>
                <CardContent className="p-6 md:p-8 space-y-6">
                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      1. Общие положения
                    </h2>
                    <p>
                      Настоящая Политика конфиденциальности определяет порядок обработки и защиты 
                      персональных данных пользователей веб-сайта Telfera.kz (далее — «Сайт»). 
                      Используя Сайт, вы соглашаетесь с условиями настоящей Политики конфиденциальности.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      2. Сбор персональных данных
                    </h2>
                    <p className="mb-4">
                      Мы собираем следующие персональные данные:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Имя и контактная информация (телефон, email)</li>
                      <li>Информация о запросах и обращениях</li>
                      <li>Технические данные (IP-адрес, тип браузера, операционная система)</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      3. Использование персональных данных
                    </h2>
                    <p className="mb-4">
                      Персональные данные используются для:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Обработки заявок и обращений пользователей</li>
                      <li>Связи с пользователями по вопросам предоставления услуг</li>
                      <li>Улучшения качества работы Сайта</li>
                      <li>Информирования о новых продуктах и услугах</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      4. Защита персональных данных
                    </h2>
                    <p>
                      Мы принимаем необходимые технические и организационные меры для защиты 
                      персональных данных от несанкционированного доступа, изменения, раскрытия 
                      или уничтожения. Все данные хранятся в защищенных системах с ограниченным 
                      доступом.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      5. Передача персональных данных
                    </h2>
                    <p>
                      Мы не передаем персональные данные третьим лицам, за исключением случаев, 
                      когда это необходимо для выполнения ваших запросов или требуется 
                      законодательством Республики Казахстан.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      6. Права пользователей
                    </h2>
                    <p className="mb-4">
                      Вы имеете право:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Получать информацию о ваших персональных данных</li>
                      <li>Требовать исправления неточных данных</li>
                      <li>Требовать удаления ваших персональных данных</li>
                      <li>Отозвать согласие на обработку персональных данных</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      7. Cookies
                    </h2>
                    <p>
                      Сайт использует файлы cookie для улучшения пользовательского опыта и 
                      анализа посещаемости. Вы можете отключить cookies в настройках вашего 
                      браузера, однако это может повлиять на функциональность Сайта.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      8. Изменения в Политике конфиденциальности
                    </h2>
                    <p>
                      Мы оставляем за собой право вносить изменения в настоящую Политику 
                      конфиденциальности. Актуальная версия всегда доступна на данной странице. 
                      Рекомендуем периодически просматривать эту страницу для ознакомления 
                      с изменениями.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-2xl font-bold mb-4 text-foreground">
                      9. Контакты
                    </h2>
                    <p className="mb-2">
                      По всем вопросам, связанным с обработкой персональных данных, вы можете 
                      обратиться к нам:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li>
                        <strong>Email:</strong>{" "}
                        <a 
                          href="mailto:info@jtns.kz" 
                          className="text-primary hover:underline"
                        >
                          info@jtns.kz
                        </a>
                      </li>
                      <li>
                        <strong>Телефон:</strong>{" "}
                        <a 
                          href="tel:+77015320626" 
                          className="text-primary hover:underline"
                        >
                          +7 (701) 532-06-26
                        </a>
                      </li>
                      <li>
                        <strong>Адрес:</strong> г. Алматы, Казахстан
                      </li>
                    </ul>
                  </section>

                  <section className="pt-4 border-t">
                    <p className="text-sm">
                      <strong>Дата последнего обновления:</strong>{" "}
                      {new Intl.DateTimeFormat("ru-RU", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date("2024-01-01"))}
                    </p>
                  </section>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
