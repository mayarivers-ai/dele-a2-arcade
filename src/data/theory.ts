export interface TheoryExample {
  es: string
  ru: string
}

export interface TheoryLesson {
  id: string
  title: string
  title_ru: string
  bloque: number
  content: {
    explanation: string
    explanation_ru: string
    rule: string
    rule_ru: string
    examples: TheoryExample[]
    note?: string
    note_ru?: string
  }
  exerciseLink?: string
}

export interface TheoryBlock {
  id: number
  title: string
  title_ru: string
  emoji: string
  lessons: TheoryLesson[]
}

export const theoryBlocks: TheoryBlock[] = [
  {
    id: 0,
    title: 'Fundamentos',
    title_ru: 'Основы',
    emoji: '🔤',
    lessons: [
      {
        id: '0.1',
        title: 'El alfabeto español y la pronunciación',
        title_ru: 'Испанский алфавит и произношение',
        bloque: 0,
        content: {
          explanation: 'El español usa el alfabeto latino con 27 letras. A diferencia del ruso, cada letra tiene casi siempre el mismo sonido — no hay reducción vocálica ni consonantes suaves/duras.',
          explanation_ru: 'Испанский язык использует латинский алфавит из 27 букв. В отличие от русского, каждая буква почти всегда звучит одинаково — нет редукции гласных и нет мягких/твёрдых согласных.',
          rule: 'En español, las vocales (a, e, i, o, u) siempre suenan igual, independientemente de la posición en la palabra.',
          rule_ru: 'В испанском гласные (a, e, i, o, u) всегда звучат одинаково, независимо от позиции в слове. Нет безударного "о", которое звучит как "а", как в русском.',
          examples: [
            { es: 'casa → ca-sa', ru: 'дом — все гласные звучат чётко, без редукции' },
            { es: 'mesa → me-sa', ru: 'стол — "е" всегда "е", не "и"' },
            { es: 'libro → li-bro', ru: 'книга — все гласные произносятся полно' },
          ],
          note: 'En ruso las vocales átonas se reducen (молоко suena "малако"). En español esto NO ocurre.',
          note_ru: 'В русском безударные гласные редуцируются: "молоко" → "малако". В испанском этого НЕТ: все гласные произносятся чётко, даже без ударения.',
        },
      },
      {
        id: '0.2',
        title: 'El español no tiene casos gramaticales',
        title_ru: 'В испанском нет падежей',
        bloque: 0,
        content: {
          explanation: 'El ruso tiene 6 casos que cambian la terminación de las palabras según su función en la frase. El español no tiene casos: la posición en la oración y las preposiciones hacen ese trabajo.',
          explanation_ru: 'В русском языке 6 падежей, которые изменяют окончания слов в зависимости от их роли в предложении. В испанском падежей НЕТ: их работу выполняют предлоги и порядок слов.',
          rule: 'En español el sustantivo nunca cambia su forma según la función gramatical. Se usan preposiciones (a, de, con, en…) para indicar relaciones.',
          rule_ru: 'В испанском существительное НИКОГДА не меняет форму в зависимости от грамматической функции. Для выражения отношений используются предлоги (a, de, con, en…).',
          examples: [
            { es: 'Veo a Juan (objeto directo)', ru: 'Я вижу Хуана — в рус. винительный: Хуана' },
            { es: 'El libro de Juan (posesión)', ru: 'Книга Хуана — в рус. родительный: Хуана' },
            { es: 'Hablo con Juan (compañía)', ru: 'Говорю с Хуаном — в рус. творительный: с Хуаном' },
          ],
          note_ru: 'Не пытайся "переводить" падеж напрямую — ищи испанский предлог, который передаёт то же значение. Иногда предлог вообще не нужен.',
        },
      },
      {
        id: '0.3',
        title: 'Acento y entonación: el español es musical',
        title_ru: 'Ударение и интонация',
        bloque: 0,
        content: {
          explanation: 'El español tiene un ritmo silábico — todas las sílabas duran aproximadamente lo mismo. El ruso tiene ritmo acentual, con sílabas tónicas más largas y átonas muy reducidas.',
          explanation_ru: 'Испанский язык имеет слоговой ритм — все слоги длятся примерно одинаково. Русский язык имеет ударный ритм: ударные слоги длиннее, безударные сильно сокращаются.',
          rule: 'El acento en español está indicado por tilde (´) cuando no sigue las reglas generales. Las palabras llanas (acento en penúltima sílaba) son las más comunes.',
          rule_ru: 'Ударение в испанском обозначается знаком тильды (´), когда слово не следует общим правилам. Самый распространённый тип — слова с ударением на предпоследнем слоге (palabras llanas).',
          examples: [
            { es: 'caSA, meSA, liBRO (llanas, sin tilde)', ru: 'ударение на предпоследнем слоге — тильда не нужна' },
            { es: 'caFÉ, mamá, sofÁ (agudas, con tilde)', ru: 'ударение на последнем слоге — тильда обязательна' },
            { es: 'MÚsica, télefono (esdrújulas, siempre tilde)', ru: 'ударение на третьем слоге — тильда всегда' },
          ],
        },
      },
      {
        id: '0.4',
        title: 'Cómo leer fonética española',
        title_ru: 'Как читать по-испански',
        bloque: 0,
        content: {
          explanation: 'El español es muy fonético: casi siempre se escribe como se pronuncia. Los pocos sonidos que no existen en ruso se aprenden rápido.',
          explanation_ru: 'Испанский очень фонетичен: почти всегда пишется так, как произносится. Немногочисленные звуки, которых нет в русском, осваиваются быстро.',
          rule: 'Sonidos clave: la "j" y "g" (ante e/i) suenan como х rusa pero más suave. La "r" simple es vibración única entre vocales. La "rr" y "r" inicial es vibración múltiple.',
          rule_ru: 'Ключевые звуки: "j" и "g" (перед e/i) звучат как русское "х", но мягче. Одиночная "r" — это один удар кончика языка. "rr" и "r" в начале слова — раскатистая вибрация.',
          examples: [
            { es: 'jardín [xardín]', ru: 'как "х" в "хорошо", но мягче' },
            { es: 'pero [péɾo] vs perro [péro]', ru: '"р" одиночная (один удар) vs "рр" раскатистая' },
            { es: 'v y b suenan igual: vino = bino', ru: '"в" и "б" не различаются — оба звучат как "б"' },
          ],
          note_ru: 'Буквы "v" и "b" в современном испанском звучат одинаково. Это непривычно для русского уха, но не влияет на понимание.',
        },
      },
    ],
  },
  {
    id: 1,
    title: 'El Sustantivo y el Artículo',
    title_ru: 'Существительное и артикль',
    emoji: '📝',
    lessons: [
      {
        id: '1.1',
        title: 'Género masculino y femenino',
        title_ru: 'Мужской и женский род',
        bloque: 1,
        content: {
          explanation: 'El español solo tiene dos géneros: masculino y femenino. El ruso tiene tres (masculino, femenino, neutro). En español todos los objetos son "él" o "ella" — no existe el neutro para sustantivos comunes.',
          explanation_ru: 'В испанском только два рода: мужской и женский. В русском три (м., ж., ср.). В испанском все предметы — либо "он", либо "она". Среднего рода для обычных существительных нет.',
          rule: 'Regla general: palabras terminadas en -o → masculino; en -a → femenino. Hay muchas excepciones importantes que hay que memorizar.',
          rule_ru: 'Общее правило: слова на -o → мужской род; на -a → женский род. Важных исключений много — их надо запоминать. Лучшая стратегия: учить слово сразу с артиклем.',
          examples: [
            { es: 'el libro (m), la mesa (f)', ru: 'книга (ж.), стол (м.) — в испанском стол тоже м.р.' },
            { es: 'el problema, el mapa, el día', ru: 'исключения: слова на -а, но мужского рода' },
            { es: 'la mano, la foto, la radio', ru: 'исключения: слова на -о, но женского рода' },
          ],
          note_ru: 'В русском род обычно угадывается по окончанию достаточно точно. В испанском исключений больше. Золотое правило: учи не "libro", а "el libro" — артикль покажет род.',
        },
      },
      {
        id: '1.2',
        title: 'Artículos determinados: el, la, los, las',
        title_ru: 'Определённые артикли: el, la, los, las',
        bloque: 1,
        content: {
          explanation: 'El artículo determinado equivale al concepto de "ese específico" o "ya sabemos de cuál hablamos". En ruso NO existe este concepto gramatical — es uno de los mayores retos para rusohablantes.',
          explanation_ru: 'Определённый артикль — это способ сказать "тот самый, конкретный, о котором уже знаем". В русском языке этой грамматической категории НЕТ — это одна из главных трудностей для русскоговорящих.',
          rule: 'el (m. sg.), la (f. sg.), los (m. pl.), las (f. pl.). Используется когда говорящий и слушающий знают, о каком конкретном предмете речь.',
          rule_ru: 'el (м. ед.ч.), la (ж. ед.ч.), los (м. мн.ч.), las (ж. мн.ч.). Используется, когда и говорящий, и слушающий понимают, о каком конкретном предмете идёт речь.',
          examples: [
            { es: '¿Dónde está el baño?', ru: 'Где туалет? — конкретный, единственный в контексте' },
            { es: 'Me gusta la música.', ru: 'Мне нравится музыка (музыка вообще, как категория)' },
            { es: 'Los estudiantes llegaron tarde.', ru: 'Студенты опоздали (те самые, о ком шла речь)' },
          ],
          note_ru: 'В русском контекст всё объясняет без артиклей. В испанском нужно выбрать: el/la (определённый), un/una (неопределённый) или ничего. Сначала кажется произвольным — с практикой станет инстинктивным.',
        },
        exerciseLink: '/practica',
      },
      {
        id: '1.3',
        title: 'Artículos indeterminados: un, una, unos, unas',
        title_ru: 'Неопределённые артикли: un, una, unos, unas',
        bloque: 1,
        content: {
          explanation: 'El artículo indeterminado introduce algo nuevo en la conversación, algo que el oyente no conoce todavía. Equivale al concepto "algún, cierto".',
          explanation_ru: 'Неопределённый артикль вводит что-то новое в разговор — то, о чём слушатель ещё не знает. Примерно соответствует русскому "какой-то, некий, один".',
          rule: 'un (m. sg.), una (f. sg.), unos (m. pl.), unas (f. pl.). Se usa la primera vez que mencionamos algo, o cuando es uno entre muchos posibles.',
          rule_ru: 'un (м. ед.ч.), una (ж. ед.ч.), unos (м. мн.ч.), unas (ж. мн.ч.). Используется при первом упоминании предмета или когда имеется в виду любой из многих.',
          examples: [
            { es: 'Tengo un perro.', ru: 'У меня есть собака (первое упоминание, неизвестная слушателю)' },
            { es: 'Busco un apartamento.', ru: 'Я ищу квартиру (любую подходящую)' },
            { es: 'Compré unas naranjas.', ru: 'Я купил апельсины (несколько штук, не конкретных)' },
          ],
        },
      },
      {
        id: '1.4',
        title: 'Cuándo NO usar artículo',
        title_ru: 'Когда НЕ нужен артикль',
        bloque: 1,
        content: {
          explanation: 'No siempre se usa artículo. Hay contextos donde se omite, y aprenderlos evita el error de "sobrearticular".',
          explanation_ru: 'Артикль используется не всегда. Есть чёткие ситуации, когда его нет. Зная их, избежишь ошибки "лишнего артикля".',
          rule: 'No se usa artículo con: profesiones tras ser/estar, días de la semana en expresiones habituales, meses, y tras la preposición "de" en muchas expresiones.',
          rule_ru: 'Артикль НЕ используется: с профессиями после ser (Soy médico), с днями недели в обычных выражениях (los lunes), после предлога "de" во многих выражениях (un vaso de agua).',
          examples: [
            { es: 'Soy médico. (profesión)', ru: 'Я врач — после ser с профессией артикль не нужен' },
            { es: 'Trabajo los lunes. (hábito)', ru: 'Я работаю по понедельникам' },
            { es: 'un vaso de agua (partitivo)', ru: 'стакан воды — de + существительное без артикля' },
          ],
          note_ru: 'Типичная ошибка русскоязычных — добавлять артикль с профессиями: "Soy UN médico" — неверно! После ser/estar + профессия артикль опускается.',
        },
      },
      {
        id: '1.5',
        title: 'Plural: reglas y excepciones',
        title_ru: 'Множественное число: правила и исключения',
        bloque: 1,
        content: {
          explanation: 'El plural en español es mucho más simple que en ruso. En ruso el plural cambia según el caso y el género. En español hay dos reglas principales.',
          explanation_ru: 'Множественное число в испанском намного проще, чем в русском. В русском оно зависит от падежа и рода. В испанском всего два основных правила.',
          rule: 'Palabras en vocal → añade -s. Palabras en consonante → añade -es. Palabras en -z → cambia -z por -ces.',
          rule_ru: 'Слова на гласную → добавь -s. Слова на согласную → добавь -es. Слова на -z → замени -z на -ces.',
          examples: [
            { es: 'libro → libros, mesa → mesas', ru: 'книга → книги (просто + s)' },
            { es: 'ciudad → ciudades, papel → papeles', ru: 'город → города (+ es после согласной)' },
            { es: 'lápiz → lápices, vez → veces', ru: 'карандаш → карандаши (-z → -ces)' },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Los Pronombres',
    title_ru: 'Местоимения',
    emoji: '👤',
    lessons: [
      {
        id: '2.1',
        title: 'Pronombres personales sujeto',
        title_ru: 'Личные местоимения-подлежащие',
        bloque: 2,
        content: {
          explanation: 'En español, los pronombres sujeto son opcionales porque la terminación del verbo ya indica la persona. En ruso también se omiten, pero por razones ligeramente distintas.',
          explanation_ru: 'В испанском местоимения-подлежащие (я, ты, он...) необязательны — окончание глагола уже указывает на лицо. В русском их тоже опускают, но по немного другим причинам.',
          rule: 'yo, tú, él/ella/usted, nosotros/as, vosotros/as, ellos/ellas/ustedes. Se usan para énfasis o para evitar ambigüedad, no de forma obligatoria.',
          rule_ru: 'yo (я), tú (ты), él/ella/usted (он/она/Вы), nosotros (мы), vosotros (вы), ellos/ellas/ustedes (они/вы). Употребляются для акцента или во избежание путаницы — не обязательно.',
          examples: [
            { es: 'Hablo español. (sin pronombre, normal)', ru: 'Говорю по-испански — местоимение не нужно' },
            { es: 'YO no lo sé, pero ÉL sí. (énfasis)', ru: 'Я не знаю, а он знает — противопоставление' },
            { es: 'Usted habla muy bien. (formal)', ru: '"Usted" = вежливое "Вы" в единственном числе' },
          ],
          note_ru: '"Usted" — это вежливое "Вы" (ед.ч.), глагол при нём стоит в форме 3-го лица. В Испании также есть "vosotros" (вы, мн.ч. неформальное), в Латинской Америке — только "ustedes" для всех случаев мн.ч.',
        },
      },
      {
        id: '2.2',
        title: 'Pronombres de objeto directo',
        title_ru: 'Местоимения прямого дополнения',
        bloque: 2,
        content: {
          explanation: 'Los pronombres de objeto directo reemplazan al sustantivo que recibe directamente la acción del verbo. En ruso esto se expresa con el caso acusativo.',
          explanation_ru: 'Местоимения прямого дополнения заменяют существительное, которое непосредственно получает действие глагола. В русском это выражается винительным падежом.',
          rule: 'me, te, lo/la, nos, os, los/las. Van ANTES del verbo conjugado. Con infinitivo o gerundio pueden ir también después (enclíticos).',
          rule_ru: 'me (меня), te (тебя), lo/la (его/её), nos (нас), os (вас), los/las (их). Ставятся ПЕРЕД спрягаемым глаголом. При инфинитиве или герундии могут стоять после (присоединяются к концу).',
          examples: [
            { es: '¿Ves el libro? Sí, lo veo.', ru: 'Видишь книгу? Да, я её вижу. (lo = el libro)' },
            { es: '¿Llamas a María? Sí, la llamo.', ru: 'Ты звонишь Марии? Да, звоню. (la = María)' },
            { es: 'Quiero verlo. / Lo quiero ver.', ru: 'Хочу его увидеть — два варианта позиции' },
          ],
          note_ru: 'В испанском есть различие lo (м.р.) / la (ж.р.) — соответствует роду заменяемого существительного. Следи за родом!',
        },
      },
      {
        id: '2.3',
        title: 'Pronombres de objeto indirecto',
        title_ru: 'Местоимения косвенного дополнения',
        bloque: 2,
        content: {
          explanation: 'Los pronombres de objeto indirecto indican a quién va dirigida la acción. En ruso se expresa con el dativo.',
          explanation_ru: 'Местоимения косвенного дополнения указывают, кому адресовано действие. В русском это дательный падеж.',
          rule: 'me, te, le, nos, os, les. Van antes del verbo. Cuando van con objeto directo de 3ª persona, "le/les" se convierte en "se" (para evitar le lo, que suena mal).',
          rule_ru: 'me (мне), te (тебе), le (ему/ей), nos (нам), os (вам), les (им). Стоят перед глаголом. Когда рядом стоит местоимение прямого дополнения 3-го лица, "le/les" меняется на "se".',
          examples: [
            { es: 'Te doy el libro.', ru: 'Я тебе даю книгу (тебе = дательный)' },
            { es: 'Le hablo a ella.', ru: 'Я говорю ей (ей = дательный)' },
            { es: 'Se lo doy. (= Le lo → incorrecto)', ru: 'Я ему/ей это даю: le + lo → se + lo' },
          ],
        },
      },
      {
        id: '2.4',
        title: 'Pronombres reflexivos',
        title_ru: 'Возвратные местоимения',
        bloque: 2,
        content: {
          explanation: 'Los pronombres reflexivos indican que la acción recae sobre el mismo sujeto. En ruso existe el sufijo -ся/-сь para verbos reflexivos.',
          explanation_ru: 'Возвратные местоимения показывают, что действие направлено на самого субъекта. В русском это аналог суффикса -ся/-сь у возвратных глаголов.',
          rule: 'me, te, se, nos, os, se. Equivalen al -ся ruso en muchos verbos. Van antes del verbo conjugado.',
          rule_ru: 'me (для yo), te (для tú), se (для él/ella/usted, ellos, ustedes), nos (для nosotros), os (для vosotros). Стоят перед спрягаемым глаголом.',
          examples: [
            { es: 'Me llamo Ana. (llamarse)', ru: 'Меня зовут Аня (звать + ся)' },
            { es: 'Me ducho por la mañana. (ducharse)', ru: 'Я принимаю душ утром (мыться)' },
            { es: 'Nos levantamos a las 7. (levantarse)', ru: 'Мы встаём в 7 (вставать)' },
          ],
          note_ru: 'Не все испанские возвратные глаголы соответствуют глаголам с -ся в русском, и наоборот. Например, "me gusta" (мне нравится) — не возвратный, но использует местоимение дательного падежа.',
        },
        exerciseLink: '/practica',
      },
      {
        id: '2.5',
        title: 'Pronombres posesivos',
        title_ru: 'Притяжательные местоимения',
        bloque: 2,
        content: {
          explanation: 'Los posesivos en español tienen dos formas: los átonos (antes del sustantivo) y los tónicos (después o solos). En ruso solo hay una forma que concuerda con el sustantivo.',
          explanation_ru: 'Притяжательные местоимения в испанском имеют две формы: безударные (перед существительным) и ударные (после или самостоятельно). В русском одна форма, согласующаяся с существительным.',
          rule: 'Átonos: mi/mis, tu/tus, su/sus, nuestro/a/os/as, vuestro/a/os/as, su/sus. Tónicos: mío/a/os/as, tuyo/a/os/as, suyo/a/os/as…',
          rule_ru: 'Безударные: mi/mis (мой/мои), tu/tus (твой/твои), su/sus (его/её/их). Ударные: mío/a (мой/моя), tuyo/a (твой/твоя)... Согласуются в роде и числе с предметом, которым владеют.',
          examples: [
            { es: 'mi libro / el libro mío', ru: 'моя книга / книга моя (обе формы возможны)' },
            { es: 'Esta mesa es tuya.', ru: 'Этот стол твой (ударная форма после глагола ser)' },
            { es: 'nuestros amigos', ru: 'наши друзья (согласуется в роде и числе)' },
          ],
        },
      },
      {
        id: '2.6',
        title: 'Pronombres demostrativos',
        title_ru: 'Указательные местоимения',
        bloque: 2,
        content: {
          explanation: 'Los demostrativos señalan la distancia entre el objeto y el hablante. El español tiene tres niveles de distancia; el ruso moderno solo usa dos (этот/тот).',
          explanation_ru: 'Указательные местоимения показывают расстояние между предметом и говорящим. В испанском три степени расстояния; в современном русском две (этот/тот).',
          rule: 'este/esta/estos/estas (cerca del hablante), ese/esa/esos/esas (cerca del oyente o distancia media), aquel/aquella/aquellos/aquellas (lejos de ambos).',
          rule_ru: 'este/esta (этот/эта — рядом со мной), ese/esa (тот/та — рядом с тобой или на средней дистанции), aquel/aquella (вон тот/та — далеко от обоих). Согласуются с родом существительного.',
          examples: [
            { es: 'Este libro es mío. (aquí, conmigo)', ru: 'Эта книга моя (рядом со мной)' },
            { es: 'Ese coche es tuyo. (ahí, contigo)', ru: 'Та машина твоя (рядом с тобой)' },
            { es: 'Aquel edificio es muy antiguo.', ru: 'Вон то здание очень старое (далеко)' },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: 'El Verbo — Presente',
    title_ru: 'Глагол — настоящее время',
    emoji: '⚡',
    lessons: [
      {
        id: '3.1',
        title: 'Conjugación regular: -AR, -ER, -IR',
        title_ru: 'Правильные глаголы: -AR, -ER, -IR',
        bloque: 3,
        content: {
          explanation: 'Los verbos regulares siguen patrones fijos según su terminación en infinitivo. La terminación del verbo indica la persona — no se necesita el pronombre sujeto.',
          explanation_ru: 'Правильные глаголы следуют фиксированным образцам в зависимости от окончания инфинитива (-AR, -ER, -IR). Окончание глагола указывает на лицо — местоимение-подлежащее не нужно.',
          rule: '-AR: hablo, hablas, habla, hablamos, habláis, hablan. -ER: como, comes, come, comemos, coméis, comen. -IR: vivo, vives, vive, vivimos, vivís, viven.',
          rule_ru: '-AR: hablo, hablas, habla, hablamos, habláis, hablan (-o/-as/-a/-amos/-áis/-an). -ER: como, comes, come, comemos, coméis, comen (-o/-es/-e/-emos/-éis/-en). -IR: vivo, vives, vive, vivimos, vivís, viven (-o/-es/-e/-imos/-ís/-en).',
          examples: [
            { es: 'hablar → hablo, hablas, habla…', ru: 'говорить — окончания -o/-as/-a/-amos/-áis/-an' },
            { es: 'comer → como, comes, come…', ru: 'есть (кушать) — окончания -o/-es/-e/-emos/-éis/-en' },
            { es: 'vivir → vivo, vives, vive…', ru: 'жить — окончания -o/-es/-e/-imos/-ís/-en' },
          ],
        },
        exerciseLink: '/arcade',
      },
      {
        id: '3.2',
        title: 'Los verbos irregulares más frecuentes',
        title_ru: 'Самые частые неправильные глаголы',
        bloque: 3,
        content: {
          explanation: 'Hay verbos muy usados que no siguen los patrones regulares. Son irregulares en la 1ª persona singular o en todas las personas. Hay que memorizarlos.',
          explanation_ru: 'Самые употребительные глаголы нередко неправильные — не следуют общим правилам. Неправильность либо только в 1-м лице ед.ч., либо во всех формах. Их надо заучить.',
          rule: 'ser (soy, eres, es…), estar (estoy, estás, está…), ir (voy, vas, va…), tener (tengo, tienes…), hacer (hago, haces…), poder (puedo, puedes…), querer (quiero, quieres…)',
          rule_ru: 'ser: soy/eres/es/somos/sois/son. estar: estoy/estás/está/estamos/estáis/están. ir: voy/vas/va/vamos/vais/van. tener: tengo/tienes/tiene... hacer: hago/haces/hace...',
          examples: [
            { es: 'ser: soy / eres / es / somos / sois / son', ru: 'быть (постоянное): я/ты/он/мы/вы/они' },
            { es: 'ir: voy / vas / va / vamos / vais / van', ru: 'идти/ехать — полностью неправильный' },
            { es: 'tener: tengo / tienes / tiene / tenemos…', ru: 'иметь: 1-е лицо неправильное (tengo)' },
          ],
        },
        exerciseLink: '/arcade',
      },
      {
        id: '3.3',
        title: 'SER vs ESTAR',
        title_ru: 'SER vs ESTAR',
        bloque: 3,
        content: {
          explanation: 'Это самая известная ошибка русскоязычных. В русском — одно слово "быть" (опускается в настоящем). В испанском ДВА глагола: ser и estar с чёткими различиями.',
          explanation_ru: 'Это самая известная ошибка русскоязычных. В русском — одно слово "быть" (опускается в настоящем). В испанском ДВА глагола: ser и estar — с совершенно разными функциями.',
          rule: 'SER: identidad permanente o inherente (origen, profesión, material, hora, eventos). ESTAR: estados temporales, ubicación, resultado de un cambio.',
          rule_ru: 'SER — постоянное, определяющее: происхождение, профессия, материал, время, мероприятия. ESTAR — временное состояние, местоположение, результат изменения.',
          examples: [
            { es: 'Soy ruso. (origen/nacionalidad — ser)', ru: 'Я русский — идентичность, постоянно → SER' },
            { es: 'Estoy cansado. (estado temporal — estar)', ru: 'Я устал — временное состояние → ESTAR' },
            { es: 'El café es caliente. / El café está caliente.', ru: 'Кофе горячий (свойство) vs кофе горячий (сейчас)' },
          ],
          note_ru: 'В русском "быть" опускается: "Я врач", "Он здесь". В испанском глагол ВСЕГДА есть: "Soy médico" (ser), "Está aquí" (estar). Местоположение — ВСЕГДА estar (кроме мероприятий: "La fiesta es en mi casa").',
        },
        exerciseLink: '/practica',
      },
      {
        id: '3.4',
        title: 'Verbos reflexivos',
        title_ru: 'Возвратные глаголы',
        bloque: 3,
        content: {
          explanation: 'Los verbos reflexivos llevan siempre el pronombre reflexivo (me, te, se…). Son muy frecuentes en el vocabulario de rutinas diarias.',
          explanation_ru: 'Возвратные глаголы всегда употребляются с возвратным местоимением (me, te, se…). Очень часто встречаются при описании распорядка дня.',
          rule: 'El pronombre reflexivo va antes del verbo conjugado y concuerda con el sujeto: yo me lavo, tú te lavas, él se lava, nosotros nos lavamos…',
          rule_ru: 'Возвратное местоимение стоит ПЕРЕД спрягаемым глаголом и согласуется с подлежащим: yo me lavo, tú te lavas, él se lava, nosotros nos lavamos…',
          examples: [
            { es: 'levantarse: me levanto, te levantas, se levanta…', ru: 'вставать: я встаю, ты встаёшь...' },
            { es: 'Me ducho a las 8.', ru: 'Я принимаю душ в 8' },
            { es: '¿Cómo te llamas?', ru: 'Как тебя зовут? (llamarse = звать+ся)' },
          ],
        },
      },
      {
        id: '3.5',
        title: 'Verbos con cambio vocálico',
        title_ru: 'Глаголы с чередованием гласных',
        bloque: 3,
        content: {
          explanation: 'Muchos verbos cambian la vocal de la raíz en las formas tónicas (yo, tú, él, ellos). Este cambio ocurre solo cuando el acento cae en la raíz.',
          explanation_ru: 'Многие глаголы изменяют гласную корня в ударных формах (yo, tú, él, ellos). Изменение происходит только когда ударение падает на корень.',
          rule: 'e → ie: querer, entender, empezar. o → ue: poder, volver, dormir. e → i: pedir, servir, seguir. НЕ меняется в nosotros/vosotros.',
          rule_ru: 'e → ie: querer (хотеть), entender (понимать). o → ue: poder (мочь), dormir (спать). e → i: pedir (просить). В nosotros/vosotros изменения НЕТ.',
          examples: [
            { es: 'querer: quiero / quieres / quiere / queremos / queréis / quieren', ru: 'хотеть: e→ie в ударных формах, кроме мы/вы' },
            { es: 'poder: puedo / puedes / puede / podemos / podéis / pueden', ru: 'мочь: o→ue в ударных формах' },
            { es: 'pedir: pido / pides / pide / pedimos / pedís / piden', ru: 'просить: e→i в ударных формах' },
          ],
        },
        exerciseLink: '/arcade',
      },
      {
        id: '3.6',
        title: 'Hay vs. Está / Están',
        title_ru: 'Hay vs. Está / Están',
        bloque: 3,
        content: {
          explanation: 'Otro error clásico del rusohablante. El ruso usa "есть" (o lo omite) para ambos conceptos. El español distingue existencia (hay) de ubicación de algo concreto (está/están).',
          explanation_ru: 'Ещё одна классическая ошибка. В русском "есть" (или ничего) для обоих случаев. В испанском: существование → hay; местоположение конкретного предмета → está/están.',
          rule: 'HAY: existencia impersonal ("existe"). No varía en número. ESTÁ/ESTÁN: ubicación de algo ya identificado.',
          rule_ru: 'HAY = существование (есть, имеется) — не изменяется по числу. ESTÁ/ESTÁN = местонахождение уже известного предмета (находится, стоит).',
          examples: [
            { es: 'Hay un banco en esta calle.', ru: 'На этой улице есть банк (существование) → HAY' },
            { es: 'El banco está en la esquina.', ru: 'Банк находится на углу (место конкретного) → ESTÁ' },
            { es: '¿Hay leche? — Sí, está en la nevera.', ru: 'Есть молоко? — Да, оно в холодильнике.' },
          ],
          note_ru: '"Hay" ВСЕГДА неизменно: hay una persona, hay dos personas — во множественном числе форма не меняется. Типичная ошибка: "Están dos personas" вместо "Hay dos personas" (существование).',
        },
      },
    ],
  },
  {
    id: 4,
    title: 'El Verbo — Pasado',
    title_ru: 'Глагол — прошедшее время',
    emoji: '⏪',
    lessons: [
      {
        id: '4.1',
        title: 'Pretérito Indefinido: verbos regulares',
        title_ru: 'Pretérito Indefinido: правильные глаголы',
        bloque: 4,
        content: {
          explanation: 'El Pretérito Indefinido expresa acciones completadas en el pasado, con un tiempo definido o visto como concluido.',
          explanation_ru: 'Pretérito Indefinido (он же Pretérito Simple) выражает завершённые действия в прошлом — с конкретным временем или воспринимаемые как законченные.',
          rule: '-AR: hablé, hablaste, habló, hablamos, hablasteis, hablaron. -ER/-IR: comí, comiste, comió, comimos, comisteis, comieron.',
          rule_ru: '-AR: hablé (я), hablaste (ты), habló (он), hablamos (мы), hablasteis (вы), hablaron (они). -ER/-IR: comí, comiste, comió, comimos, comisteis, comieron.',
          examples: [
            { es: 'Ayer hablé con mi madre.', ru: 'Вчера я поговорил с мамой (завершённое)' },
            { es: 'El año pasado viví en Madrid.', ru: 'В прошлом году я жил в Мадриде' },
            { es: '¿Comiste ya?', ru: 'Ты уже поел?' },
          ],
          note_ru: 'В испанском ДВА основных прошедших времени: Indefinido и Imperfecto. В русском их различие передаётся через вид глагола (совершенный/несовершенный). В испанском механизм другой — см. урок 4.4.',
        },
        exerciseLink: '/arcade',
      },
      {
        id: '4.2',
        title: 'Pretérito Indefinido: irregulares frecuentes',
        title_ru: 'Pretérito Indefinido: частые неправильные',
        bloque: 4,
        content: {
          explanation: 'Los verbos más usados tienen formas irregulares en el Indefinido. Los irregulares "fuertes" tienen acento en la raíz en yo y él.',
          explanation_ru: 'Самые употребительные глаголы имеют неправильные формы в Indefinido. У "сильных" неправильных глаголов ударение в формах yo и él падает на корень, а не на окончание.',
          rule: 'ser/ir: fui, fuiste, fue, fuimos, fuisteis, fueron. tener: tuve, tuviste, tuvo… hacer: hice, hiciste, hizo… poder: pude… venir: vine…',
          rule_ru: 'ser/ir (одинаковые формы!): fui/fuiste/fue/fuimos/fuisteis/fueron. tener: tuve/tuviste/tuvo... hacer: hice/hiciste/hizo... poder: pude... venir: vine...',
          examples: [
            { es: 'Fui al médico ayer. (ir)', ru: 'Вчера я ходил к врачу' },
            { es: 'Hice los deberes. (hacer)', ru: 'Я сделал домашнее задание' },
            { es: 'Tuve un problema. (tener)', ru: 'У меня возникла проблема' },
          ],
          note_ru: 'Ser и Ir имеют ОДИНАКОВЫЕ формы в Indefinido: "fui". Только контекст помогает различить: "fui al cine" (ir — пошёл) vs "fui presidente" (ser — был).',
        },
        exerciseLink: '/arcade',
      },
      {
        id: '4.3',
        title: 'Pretérito Imperfecto: usos y conjugación',
        title_ru: 'Imperfecto: использование и спряжение',
        bloque: 4,
        content: {
          explanation: 'El Imperfecto describe situaciones en el pasado: hábitos pasados, descripciones, acciones en curso cuando otra cosa ocurrió, y estados mentales o físicos.',
          explanation_ru: 'Imperfecto описывает ситуации в прошлом: прошлые привычки, описания, действия в процессе, когда произошло другое событие, и ментальные/физические состояния.',
          rule: '-AR: hablaba, hablabas, hablaba, hablábamos, hablabais, hablaban. -ER/-IR: comía, comías, comía, comíamos, comíais, comían. Solo 3 irregulares: ser (era), ir (iba), ver (veía).',
          rule_ru: '-AR: hablaba/hablabas/hablaba/hablábamos/hablabais/hablaban. -ER/-IR: comía/comías/comía... Только 3 неправильных: ser → era, ir → iba, ver → veía.',
          examples: [
            { es: 'Cuando era niño, vivía en Moscú. (hábito/estado)', ru: 'Когда я был ребёнком, жил в Москве' },
            { es: 'Llovía cuando salí. (acción en curso)', ru: 'Шёл дождь, когда я вышел' },
            { es: 'Antes comía mucha carne. (hábito pasado)', ru: 'Раньше я много ел мяса' },
          ],
        },
      },
      {
        id: '4.4',
        title: 'Indefinido vs Imperfecto',
        title_ru: 'Indefinido vs Imperfecto',
        bloque: 4,
        content: {
          explanation: 'Esta distinción es difícil para rusohablantes porque el ruso la resuelve con el aspecto verbal (perfectivo vs imperfectivo), que es un mecanismo diferente aunque con cierto paralelismo.',
          explanation_ru: 'Это различие трудно для русскоязычных, потому что русский решает ту же задачу через вид глагола (сов./несов.) — механизм похожий, но не идентичный.',
          rule: 'INDEFINIDO: acción concluida, puntual, que avanza la narración. IMPERFECTO: descripción del fondo, hábito, estado, acción en proceso que fue interrumpida.',
          rule_ru: 'INDEFINIDO — завершённое, точечное действие, двигающее повествование вперёд. IMPERFECTO — фон, описание, привычка, состояние, процесс, прерванный другим событием.',
          examples: [
            { es: 'Vivía en Madrid cuando conocí a Ana.', ru: 'Жил (фон, imperfecto) в Мадриде, когда познакомился (событие, indefinido) с Аней.' },
            { es: 'De niño jugaba al fútbol todos los días.', ru: 'В детстве я каждый день играл в футбол (привычка → imperfecto)' },
            { es: 'Ayer jugué al fútbol una hora.', ru: 'Вчера я сыграл в футбол час (один раз, завершено → indefinido)' },
          ],
          note_ru: 'Приблизительная аналогия: Imperfecto ≈ несовершенный вид (играл, жил). Indefinido ≈ совершенный вид (сыграл, прожил). Но это НЕ точное соответствие — есть важные различия.',
        },
        exerciseLink: '/practica',
      },
      {
        id: '4.5',
        title: 'Pretérito Perfecto: he comido',
        title_ru: 'Pretérito Perfecto: he comido',
        bloque: 4,
        content: {
          explanation: 'El Pretérito Perfecto (he/has/ha + participio) se usa en España para acciones pasadas recientes o conectadas al presente.',
          explanation_ru: 'Pretérito Perfecto (he/has/ha + причастие) используется в Испании для недавно завершённых действий или действий, связанных с настоящим моментом.',
          rule: 'Se forma con el presente de HABER + participio (-ado/-ido). El participio es invariable. Marcadores: hoy, esta semana, este mes, ya, todavía no, alguna vez.',
          rule_ru: 'Образуется: настоящее время HABER + причастие (-ado/-ido). Причастие не изменяется. Маркеры: hoy (сегодня), esta semana (на этой неделе), ya (уже), todavía no (ещё нет), alguna vez (когда-либо).',
          examples: [
            { es: 'Hoy he comido paella.', ru: 'Сегодня я ел паэлью (hoy → Perfecto в Испании)' },
            { es: '¿Has estado en Madrid?', ru: 'Ты был в Мадриде? (жизненный опыт)' },
            { es: 'Todavía no he terminado.', ru: 'Я ещё не закончил (актуально для настоящего)' },
          ],
          note_ru: 'В Латинской Америке и во многих разговорных ситуациях в Испании используется Indefinido там, где в Испании был бы Perfecto: "Hoy comí paella". Для DELE A2 нужно уметь распознавать оба варианта.',
        },
      },
    ],
  },
  {
    id: 5,
    title: 'El Verbo — Futuro y otros',
    title_ru: 'Глагол — будущее и другие',
    emoji: '🔮',
    lessons: [
      {
        id: '5.1',
        title: 'Futuro inmediato: ir a + infinitivo',
        title_ru: 'Ближайшее будущее: ir a + инфинитив',
        bloque: 5,
        content: {
          explanation: 'La forma más común para hablar del futuro en el español cotidiano es ir a + infinitivo. Es equivalente al inglés "going to" y al русскому "собираться + инфинитив".',
          explanation_ru: 'Самый распространённый способ говорить о будущем в разговорном испанском — ir a + инфинитив. Аналог русского "собираться + инфинитив" или "буду делать".',
          rule: 'PRESENTE de IR + a + INFINITIVO. Expresa planes, intenciones o predicciones basadas en evidencias presentes.',
          rule_ru: 'Настоящее время IR + a + ИНФИНИТИВ. Выражает планы, намерения или предсказания, основанные на очевидных признаках в настоящем.',
          examples: [
            { es: 'Voy a estudiar esta tarde.', ru: 'Я собираюсь учиться сегодня вечером' },
            { es: '¿Qué vas a hacer el fin de semana?', ru: 'Что ты собираешься делать на выходных?' },
            { es: 'Va a llover — mira las nubes.', ru: 'Сейчас пойдёт дождь — смотри на тучи (очевидный признак)' },
          ],
        },
      },
      {
        id: '5.2',
        title: 'Futuro simple: conjugación y uso',
        title_ru: 'Futuro Simple: спряжение и использование',
        bloque: 5,
        content: {
          explanation: 'El Futuro Simple tiene sus propias terminaciones que se añaden directamente al infinitivo (para regulares). Se usa para predicciones más generales y promesas.',
          explanation_ru: 'Futuro Simple имеет собственные окончания, которые добавляются прямо к инфинитиву (для правильных глаголов). Используется для общих предсказаний и обещаний.',
          rule: 'Infinitivo + -é, -ás, -á, -emos, -éis, -án. Irregulares: tener → tendr-, poder → podr-, hacer → har-, venir → vendr-, decir → dir-.',
          rule_ru: 'Инфинитив + -é/-ás/-á/-emos/-éis/-án. Неправильные: tener → tendr-, poder → podr-, hacer → har-, venir → vendr-, decir → dir- (+ те же окончания).',
          examples: [
            { es: 'Mañana hablaré con el director.', ru: 'Завтра я поговорю с директором' },
            { es: 'Tendrás noticias pronto.', ru: 'Скоро получишь новости' },
            { es: '¿Qué hora será? (probabilidad)', ru: 'Интересно, сколько сейчас времени? (предположение в настоящем)' },
          ],
          note_ru: 'Futuro Simple также выражает предположение о настоящем: "Tendrá unos 30 años" = Ему, наверное, лет 30.',
        },
      },
      {
        id: '5.3',
        title: 'El condicional básico',
        title_ru: 'Условное наклонение: основы',
        bloque: 5,
        content: {
          explanation: 'El condicional expresa hipótesis, deseos corteses y la consecuencia de algo irreal. Es muy útil para "suavizar" peticiones.',
          explanation_ru: 'Кондиционал выражает гипотезы, вежливые пожелания и следствие нереального условия. Очень полезен для смягчения просьб — аналог конструкции с "бы" в русском.',
          rule: 'Infinitivo + -ía, -ías, -ía, -íamos, -íais, -ían. Mismas irregularidades que el futuro: tendr-ía, podr-ía, har-ía…',
          rule_ru: 'Инфинитив + -ía/-ías/-ía/-íamos/-íais/-ían. Те же неправильные корни, что и в будущем времени: tendr-ía, podr-ía, har-ía…',
          examples: [
            { es: '¿Podrías ayudarme? (petición cortés)', ru: 'Не мог бы ты мне помочь? (бы + глагол)' },
            { es: 'Me gustaría viajar a Japón.', ru: 'Мне хотелось бы поехать в Японию' },
            { es: 'Si tuviera dinero, viajaría. (hipótesis)', ru: 'Если бы были деньги, я бы поехал' },
          ],
        },
      },
    ],
  },
  {
    id: 6,
    title: 'Estructura de la Oración',
    title_ru: 'Структура предложения',
    emoji: '🔧',
    lessons: [
      {
        id: '6.1',
        title: 'Orden de palabras: SVO',
        title_ru: 'Порядок слов: ПГД',
        bloque: 6,
        content: {
          explanation: 'El español tiene un orden básico Sujeto-Verbo-Objeto. El ruso, gracias a los casos, permite casi cualquier orden. En español el orden transmite énfasis.',
          explanation_ru: 'В испанском базовый порядок слов: Подлежащее-Глагол-Дополнение (SVO). В русском, благодаря падежам, порядок почти свободный. В испанском порядок слов передаёт акцент.',
          rule: 'Orden neutro: Sujeto + Verbo + Objeto. El orden puede variar para énfasis, pero el cambio añade una carga expresiva que no existe en el orden neutro del ruso.',
          rule_ru: 'Нейтральный порядок: Подлежащее + Глагол + Дополнение. Порядок можно менять для акцента, но изменённый порядок несёт экспрессивную нагрузку, которой нет в нейтральном варианте.',
          examples: [
            { es: 'Ana come manzanas. (SVO neutro)', ru: 'Аня ест яблоки (нейтральный порядок)' },
            { es: 'Manzanas come Ana. (énfasis en objeto)', ru: 'Яблоки ест Аня (акцент — необычно для испанского)' },
            { es: '¿Qué come Ana? (pregunta, SVO)', ru: 'Что Аня ест? (порядок в вопросах тот же)' },
          ],
          note_ru: 'В русском падежи позволяют менять порядок слов без изменения смысла: "Аня ест яблоки" = "Яблоки ест Аня" = "Яблоки Аня ест" — одно и то же. В испанском изменённый порядок добавляет акцент или может создать двусмысленность.',
        },
      },
      {
        id: '6.2',
        title: 'La negación: no + verbo',
        title_ru: 'Отрицание: no + глагол',
        bloque: 6,
        content: {
          explanation: 'La negación básica en español es simple: solo se añade "no" antes del verbo. En ruso se usa "не" antes del verbo — es muy similar.',
          explanation_ru: 'Основное отрицание в испанском простое: "no" ставится перед глаголом. В русском "не" — аналогично. Отличие: в испанском двойное отрицание ГРАММАТИЧЕСКИ ПРАВИЛЬНО.',
          rule: '"No" va siempre INMEDIATAMENTE antes del verbo (o del pronombre objeto). La doble negación es gramaticalmente correcta en español.',
          rule_ru: '"No" ставится НЕПОСРЕДСТВЕННО перед глаголом (или перед местоимением-дополнением, если оно есть). Двойное отрицание ("No veo nada") — грамматически ПРАВИЛЬНО.',
          examples: [
            { es: 'No hablo ruso.', ru: 'Я не говорю по-русски' },
            { es: 'No lo veo.', ru: 'Я его не вижу (no + местоимение + глагол)' },
            { es: 'No veo nada. / No viene nadie.', ru: 'Я ничего не вижу / Никто не приходит (двойное отрицание — норма)' },
          ],
          note_ru: 'Двойное отрицание ("No veo nada", "No viene nadie") — ПРАВИЛЬНО в испанском, в отличие от английского. Как в русском: "Я ничего не вижу".',
        },
      },
      {
        id: '6.3',
        title: 'Preguntas: entonación y partículas',
        title_ru: 'Вопросы: интонация и вопросительные слова',
        bloque: 6,
        content: {
          explanation: 'Las preguntas en español se forman con entonación ascendente al final (como en ruso) o usando pronombres interrogativos. En español escrito, las preguntas se marcan con ¿ al inicio.',
          explanation_ru: 'Вопросы в испанском образуются с повышением интонации в конце (как в русском) или с помощью вопросительных местоимений. На письме вопрос отмечается знаком ¿ в начале.',
          rule: 'Pronombres interrogativos: qué, quién/quiénes, cuál/cuáles, cómo, dónde, cuándo, cuánto/a/os/as, por qué. TODOS llevan tilde cuando son interrogativos.',
          rule_ru: 'Вопросительные слова: qué (что/какой), quién (кто), cuál (который/какой), cómo (как), dónde (где), cuándo (когда), cuánto (сколько), por qué (почему). ВСЕ пишутся с тильдой в вопросах.',
          examples: [
            { es: '¿Cómo te llamas?', ru: 'Как тебя зовут?' },
            { es: '¿Dónde vives?', ru: 'Где ты живёшь?' },
            { es: '¿Por qué estudias español?', ru: 'Почему ты учишь испанский?' },
          ],
        },
      },
      {
        id: '6.4',
        title: 'Las preposiciones más usadas',
        title_ru: 'Основные предлоги',
        bloque: 6,
        content: {
          explanation: 'Las preposiciones en español hacen el trabajo que los casos hacen en ruso. No hay una equivalencia 1:1 — cada preposición española tiene varios usos.',
          explanation_ru: 'Испанские предлоги делают то, что в русском делают падежи. Нет соответствия 1:1 — у каждого испанского предлога несколько значений.',
          rule: 'Principales: a (направление, время, ОД с людьми), de (владение, происхождение, материал), en (место, время), con (компания, инструмент), por (причина, продолжительность), para (цель, получатель).',
          rule_ru: 'Основные: a (направление, время, при одушевлённом ОД), de (владение, происхождение, материал), en (место, время), con (компания, инструмент), por (причина, время), para (цель, получатель).',
          examples: [
            { es: 'Voy a Madrid. / Llego a las 3.', ru: 'Еду в Мадрид. / Приеду в 3 часа.' },
            { es: 'Es el libro de Ana. / Soy de Rusia.', ru: 'Это книга Ани. / Я из России.' },
            { es: 'Trabajo con mi hermano.', ru: 'Я работаю с братом (творительный → con)' },
          ],
          note_ru: 'Русский творительный → испанский "con". Родительный → часто "de". Дательный → "a". Но это приблизительные соответствия с исключениями — не переводи падеж механически.',
        },
      },
      {
        id: '6.5',
        title: 'Por vs. Para',
        title_ru: 'Por vs. Para',
        bloque: 6,
        content: {
          explanation: 'La distinción por/para es difícil para todos los estudiantes. Ambas se traducen al ruso como "за", "для", "по", "через", "из-за"… según el contexto.',
          explanation_ru: 'Por/para — сложность для всех студентов без исключения. Оба переводятся на русский по-разному: "за", "для", "по", "через", "из-за", "к"... зависит от контекста.',
          rule: 'POR: causa/motivo, duración, medio, intercambio, a favor de, por donde. PARA: finalidad/objetivo, destinatario, opinión, fecha límite.',
          rule_ru: 'POR: причина, продолжительность, средство, обмен, в пользу, маршрут. PARA: цель/назначение, получатель, мнение, срок (к какому числу).',
          examples: [
            { es: 'Lo hago por ti. (causa/motivación)', ru: 'Делаю это из-за тебя / ради тебя' },
            { es: 'Lo hago para ti. (destinatario)', ru: 'Делаю это для тебя' },
            { es: 'Trabajo por las noches. / El regalo es para el lunes.', ru: 'Работаю по ночам / Подарок к понедельнику' },
          ],
          note_ru: 'Подсказка: PARA смотрит вперёд (цель, будущее, получатель). POR смотрит назад или вокруг (причина, мотив, обмен). "Lo hago por amor" (мотив) vs "Lo hago para el amor" (ради цели — необычно).',
        },
        exerciseLink: '/practica',
      },
    ],
  },
  {
    id: 7,
    title: 'El Adjetivo',
    title_ru: 'Прилагательное',
    emoji: '🎨',
    lessons: [
      {
        id: '7.1',
        title: 'Concordancia de género y número',
        title_ru: 'Согласование рода и числа',
        bloque: 7,
        content: {
          explanation: 'En español, el adjetivo concuerda en género (m/f) y número (sg/pl) con el sustantivo. En ruso también hay concordancia, pero con 3 géneros y 6 casos.',
          explanation_ru: 'В испанском прилагательное согласуется в роде (м/ж) и числе (ед./мн.) с существительным. В русском тоже есть согласование, но с 3 родами и 6 падежами.',
          rule: 'Adjetivos en -o: cambian -o → -a para femenino. Adjetivos en -e o consonante: misma forma para m/f. Plural: -os/-as según género.',
          rule_ru: 'Прилагательные на -o: меняют -o → -a для женского рода. Прилагательные на -e или согласную: одна форма для м. и ж. рода. Множественное число: -os/-as в зависимости от рода.',
          examples: [
            { es: 'un chico alto / una chica alta', ru: 'высокий парень / высокая девушка' },
            { es: 'un hombre inteligente / una mujer inteligente', ru: 'умный мужчина / умная женщина (одна форма)' },
            { es: 'libros interesantes / revistas interesantes', ru: 'интересные книги / интересные журналы' },
          ],
          note_ru: 'Для русскоязычных согласование в роде/числе знакомо. В испанском проще: нет падежных форм прилагательного. Только род и число.',
        },
      },
      {
        id: '7.2',
        title: 'Posición del adjetivo',
        title_ru: 'Позиция прилагательного',
        bloque: 7,
        content: {
          explanation: 'En español el adjetivo puede ir antes o después del sustantivo, y la posición puede cambiar el significado. En ruso suele ir antes del sustantivo.',
          explanation_ru: 'В испанском прилагательное может стоять до или после существительного — и позиция может менять смысл. В русском прилагательное обычно предшествует существительному.',
          rule: 'DESPUÉS del sustantivo: adjetivos descriptivos que distinguen. ANTES: valoración subjetiva o énfasis. Algunos adjetivos cambian de significado según posición.',
          rule_ru: 'ПОСЛЕ существительного: описательные прилагательные, которые различают (объективная характеристика). ПЕРЕД: субъективная оценка или акцент. Некоторые прилагательные меняют значение в зависимости от позиции.',
          examples: [
            { es: 'un coche rojo (descripción objetiva)', ru: 'красная машина (объективное описание)' },
            { es: 'un gran hombre (valoración: gran = importante)', ru: 'великий человек (перед сущ. = "великий")' },
            { es: 'un hombre grande (descripción: tamaño)', ru: 'большой человек (после сущ. = физически большой)' },
          ],
        },
      },
      {
        id: '7.3',
        title: 'Comparativos',
        title_ru: 'Сравнительная степень',
        bloque: 7,
        content: {
          explanation: 'El español usa estructura analítica (más/menos + adjetivo + que) para comparativos. En ruso existen formas sintéticas (-ее, -ше) y analíticas (более/менее).',
          explanation_ru: 'Испанский использует аналитическую структуру (más/menos + прилагательное + que) для сравнений. В русском есть и синтетические (-ее, -ше), и аналитические формы (более/менее).',
          rule: 'Superioridad: más + adj + que. Inferioridad: menos + adj + que. Igualdad: tan + adj + como. Irregulares: bueno→mejor, malo→peor, grande→mayor, pequeño→menor.',
          rule_ru: 'Превосходство: más + прил. + que (больше чем). Неполноценность: menos + прил. + que. Равенство: tan + прил. + como (так же... как). Неправильные: bueno→mejor (лучше), malo→peor (хуже).',
          examples: [
            { es: 'Madrid es más grande que Sevilla.', ru: 'Мадрид больше Севильи' },
            { es: 'Este libro es tan interesante como ese.', ru: 'Эта книга так же интересна, как та' },
            { es: 'Este hotel es mejor que aquel.', ru: 'Этот отель лучше того (mejor = лучше, неправильное)' },
          ],
        },
      },
      {
        id: '7.4',
        title: 'Superlativos',
        title_ru: 'Превосходная степень',
        bloque: 7,
        content: {
          explanation: 'El superlativo expresa el grado máximo. El español tiene dos formas: relativa (el más…) y absoluta (-ísimo). En ruso: самый + прилагательное.',
          explanation_ru: 'Превосходная степень выражает максимальную степень качества. В испанском две формы: относительная (el más...) и абсолютная (-ísimo). В русском: "самый + прилагательное".',
          rule: 'Relativo: el/la/los/las + más/menos + adj (+ de). Absoluto: adj + -ísimo/a (quita la última vocal). Significa "muy, extremadamente".',
          rule_ru: 'Относительный: el/la/los/las + más/menos + прил. (+ de = среди чего). Абсолютный: прил. + -ísimo/a (убираем последнюю гласную). Значит "очень, крайне".',
          examples: [
            { es: 'Es el estudiante más trabajador de la clase.', ru: 'Он самый трудолюбивый студент в классе' },
            { es: 'Esta paella está buenísima.', ru: 'Эта паэлья просто восхитительна! (-ísimo = очень)' },
            { es: 'Es la ciudad más bonita del mundo.', ru: 'Это самый красивый город в мире' },
          ],
        },
      },
    ],
  },
  {
    id: 8,
    title: 'Vocabulario Temático A2',
    title_ru: 'Тематический словарь A2',
    emoji: '📚',
    lessons: [
      {
        id: '8.1',
        title: 'Presentaciones y datos personales',
        title_ru: 'Знакомство и личные данные',
        bloque: 8,
        content: {
          explanation: 'Vocabulario esencial para hablar de uno mismo: nombre, origen, edad, estado civil, estudios y trabajo.',
          explanation_ru: 'Основная лексика для рассказа о себе: имя, происхождение, возраст, семейное положение, учёба и работа.',
          rule: 'Frases clave: Me llamo… / Soy de… / Tengo X años / Vivo en… / Trabajo de… / Estudio…',
          rule_ru: 'Ключевые фразы: Me llamo… (Меня зовут…) / Soy de… (Я из…) / Tengo X años (Мне X лет) / Vivo en… (Я живу в…) / Trabajo de… (Работаю кем-то) / Estudio… (Учусь на…)',
          examples: [
            { es: 'Me llamo Iván. Soy de Moscú.', ru: 'Меня зовут Иван. Я из Москвы.' },
            { es: 'Tengo 30 años. Soy casado.', ru: 'Мне 30 лет. Я женат.' },
            { es: 'Trabajo de ingeniero. Estudio español.', ru: 'Я работаю инженером. Учу испанский.' },
          ],
        },
        exerciseLink: '/practica',
      },
      {
        id: '8.2',
        title: 'Familia y relaciones',
        title_ru: 'Семья и отношения',
        bloque: 8,
        content: {
          explanation: 'Vocabulario de parentesco y relaciones personales.',
          explanation_ru: 'Лексика для описания родственных и личных отношений.',
          rule: 'madre, padre, hermano/a, hijo/a, abuelo/a, tío/a, primo/a, marido/esposo, mujer/esposa, novio/a, amigo/a.',
          rule_ru: 'madre (мама), padre (папа), hermano/a (брат/сестра), hijo/a (сын/дочь), abuelo/a (дедушка/бабушка), tío/a (дядя/тётя), primo/a (двоюродный брат/сестра), marido/esposo (муж), mujer/esposa (жена), novio/a (парень/девушка).',
          examples: [
            { es: 'Mi madre se llama Elena.', ru: 'Мою маму зовут Елена.' },
            { es: 'Tengo dos hermanos y una hermana.', ru: 'У меня два брата и одна сестра.' },
            { es: 'Mi abuelo tiene 75 años.', ru: 'Моему дедушке 75 лет.' },
          ],
        },
      },
      {
        id: '8.3',
        title: 'Casa, habitaciones y objetos cotidianos',
        title_ru: 'Дом, комнаты и бытовые предметы',
        bloque: 8,
        content: {
          explanation: 'Vocabulario del hogar para describir dónde vives y qué hay en tu casa.',
          explanation_ru: 'Лексика для описания жилья: комнаты, мебель и бытовые предметы.',
          rule: 'Habitaciones: salón (гостиная), cocina (кухня), dormitorio (спальня), baño (ванная), terraza (терраса). Objetos: sofá, mesa, silla, cama, armario, nevera, lavadora.',
          rule_ru: 'Комнаты: salón (гостиная), cocina (кухня), dormitorio (спальня), baño (ванная), terraza (терраса). Предметы: sofá (диван), mesa (стол), cama (кровать), armario (шкаф), nevera (холодильник), lavadora (стиралка).',
          examples: [
            { es: 'Mi piso tiene tres habitaciones.', ru: 'В моей квартире три комнаты.' },
            { es: 'El baño está al fondo del pasillo.', ru: 'Ванная в конце коридора.' },
            { es: 'Hay una mesa grande en el salón.', ru: 'В гостиной стоит большой стол.' },
          ],
        },
      },
      {
        id: '8.4',
        title: 'Rutinas diarias y tiempo libre',
        title_ru: 'Распорядок дня и свободное время',
        bloque: 8,
        content: {
          explanation: 'Verbos y expresiones para hablar de lo que haces cada día y en tu tiempo libre.',
          explanation_ru: 'Глаголы и выражения для описания распорядка дня и свободного времени.',
          rule: 'levantarse (вставать), desayunar (завтракать), trabajar, comer (обедать), cenar (ужинать), acostarse (ложиться спать). Ocio: ver la tele, leer, salir, hacer deporte.',
          rule_ru: 'levantarse (вставать), desayunar (завтракать), trabajar (работать), comer (обедать), cenar (ужинать), acostarse (ложиться спать). Досуг: ver la tele (смотреть ТВ), leer (читать), hacer deporte (заниматься спортом).',
          examples: [
            { es: 'Me levanto a las 7 y desayuno.', ru: 'Я встаю в 7 и завтракаю.' },
            { es: 'Los fines de semana hago deporte.', ru: 'По выходным я занимаюсь спортом.' },
            { es: '¿A qué hora te acuestas normalmente?', ru: 'Во сколько ты обычно ложишься спать?' },
          ],
        },
        exerciseLink: '/practica',
      },
      {
        id: '8.5',
        title: 'Comida y restaurante',
        title_ru: 'Еда и ресторан',
        bloque: 8,
        content: {
          explanation: 'Vocabulario para pedir en un restaurante, hablar de gustos gastronómicos y comprender menús.',
          explanation_ru: 'Лексика для заказа в ресторане, обсуждения вкусовых предпочтений и понимания меню.',
          rule: 'Pedir: Quería / Quisiera + plato. ¿Me trae…? La cuenta, por favor. Partes del menú: primero (первое), segundo (второе), postre (десерт).',
          rule_ru: 'Заказать: Quería / Quisiera + блюдо (Я бы хотел...). ¿Me trae…? (Принесите мне...?). La cuenta (счёт). Структура: primero (первое), segundo (второе), postre (десерт).',
          examples: [
            { es: 'Quería una paella de marisco, por favor.', ru: 'Я бы хотел паэлью с морепродуктами, пожалуйста.' },
            { es: '¿Me trae la carta/el menú?', ru: 'Принесите мне меню, пожалуйста.' },
            { es: 'La cuenta, por favor. ¿Está incluido el servicio?', ru: 'Счёт, пожалуйста. Обслуживание включено?' },
          ],
        },
      },
      {
        id: '8.6',
        title: 'Compras y ropa',
        title_ru: 'Покупки и одежда',
        bloque: 8,
        content: {
          explanation: 'Vocabulario para comprar ropa, preguntar precios y tallas.',
          explanation_ru: 'Лексика для покупки одежды, вопросов о цене и размере.',
          rule: '¿Cuánto cuesta/n? (Сколько стоит?) ¿Tiene en talla…? (Есть в размере...?) Me lo/la llevo. (Беру это.) ¿Puedo probármelo/la? (Можно примерить?)',
          rule_ru: '¿Cuánto cuesta/n? (Сколько стоит/стоят?) ¿Tiene esta camisa en talla M? (Есть эта рубашка в размере M?) Me lo llevo. (Беру.) ¿Puedo probármelo? (Можно примерить?)',
          examples: [
            { es: '¿Tiene esta camisa en talla M?', ru: 'Есть ли эта рубашка в размере M?' },
            { es: '¿Cuánto cuesta este abrigo?', ru: 'Сколько стоит это пальто?' },
            { es: 'Me lo llevo. ¿Puedo pagar con tarjeta?', ru: 'Я возьму это. Можно оплатить картой?' },
          ],
        },
      },
      {
        id: '8.7',
        title: 'Transporte y ciudad',
        title_ru: 'Транспорт и город',
        bloque: 8,
        content: {
          explanation: 'Vocabulario para moverse por la ciudad, preguntar direcciones y usar el transporte público.',
          explanation_ru: 'Лексика для передвижения по городу, вопросов о дороге и использования общественного транспорта.',
          rule: 'Direcciones: gire a la derecha/izquierda (повернуть направо/налево), todo recto (прямо), a dos calles (в двух кварталах). Transporte: coger el metro/autobús/tren, la parada (остановка), billete (билет).',
          rule_ru: 'Направления: gire a la derecha (направо), gire a la izquierda (налево), todo recto (прямо), a dos calles (в двух кварталах). Транспорт: metro (метро), autobús (автобус), la parada (остановка), billete (билет).',
          examples: [
            { es: '¿Cómo se va a la estación de metro?', ru: 'Как пройти к станции метро?' },
            { es: 'Gire a la izquierda y todo recto.', ru: 'Повернуть налево и прямо.' },
            { es: 'Dos billetes para Madrid, por favor.', ru: 'Два билета до Мадрида, пожалуйста.' },
          ],
        },
      },
      {
        id: '8.8',
        title: 'Trabajo y estudios',
        title_ru: 'Работа и учёба',
        bloque: 8,
        content: {
          explanation: 'Vocabulario para hablar de la vida profesional y académica.',
          explanation_ru: 'Лексика для обсуждения профессиональной и учебной жизни.',
          rule: 'trabajar de/como (работать кем-то), estar en paro (быть безработным), buscar trabajo (искать работу), el sueldo (зарплата), el horario (расписание/график), la carrera (специальность в вузе).',
          rule_ru: 'trabajar de/como + профессия (работать кем-то), estar en paro (быть безработным), buscar trabajo (искать работу), el sueldo (зарплата), el horario (график), aprobar (сдать), suspender (завалить).',
          examples: [
            { es: 'Trabajo de enfermera en un hospital.', ru: 'Я работаю медсестрой в больнице.' },
            { es: 'Estudio Ingeniería en la universidad.', ru: 'Я учусь на инженерном факультете.' },
            { es: 'Busco trabajo en el sector tecnológico.', ru: 'Я ищу работу в сфере технологий.' },
          ],
        },
      },
      {
        id: '8.9',
        title: 'Salud y cuerpo',
        title_ru: 'Здоровье и тело',
        bloque: 8,
        content: {
          explanation: 'Vocabulario para hablar de enfermedades, síntomas y visitas al médico.',
          explanation_ru: 'Лексика для описания болезней, симптомов и визита к врачу.',
          rule: 'Me duele/n + parte del cuerpo (У меня болит...). Tener fiebre (температура), tos (кашель), catarro (насморк). Ir al médico (к врачу), la farmacia (аптека), la receta (рецепт).',
          rule_ru: 'Me duele la cabeza (у меня болит голова). Me duelen los pies (у меня болят ноги). Tener fiebre (температура), tos (кашель), catarro (простуда). Ir al médico (к врачу), la farmacia (аптека).',
          examples: [
            { es: 'Me duele la cabeza / la garganta.', ru: 'У меня болит голова / горло.' },
            { es: 'Tengo fiebre y tos desde ayer.', ru: 'У меня жар и кашель со вчерашнего дня.' },
            { es: 'Necesito una receta para este medicamento.', ru: 'Мне нужен рецепт на это лекарство.' },
          ],
        },
      },
      {
        id: '8.10',
        title: 'El tiempo meteorológico',
        title_ru: 'Погода',
        bloque: 8,
        content: {
          explanation: 'Vocabulario para hablar del tiempo y las condiciones atmosféricas.',
          explanation_ru: 'Лексика для описания погоды и атмосферных условий.',
          rule: 'Hace + frío/calor/viento/sol (холодно/жарко/ветрено/солнечно). Está + nublado/despejado (пасмурно/ясно). Llover: llueve (идёт дождь). Nevar: nieva (идёт снег).',
          rule_ru: 'Hace + frío (холодно) / calor (жарко) / viento (ветрено) / sol (солнечно). Está + nublado (пасмурно) / despejado (ясно). Llueve (идёт дождь). Nieva (идёт снег).',
          examples: [
            { es: 'Hoy hace mucho calor, unos 35 grados.', ru: 'Сегодня очень жарко, около 35 градусов.' },
            { es: 'Está nublado y va a llover.', ru: 'Пасмурно и собирается дождь.' },
            { es: 'En invierno aquí nieva mucho.', ru: 'Зимой здесь много снега.' },
          ],
        },
      },
      {
        id: '8.11',
        title: 'Números, fechas y horas',
        title_ru: 'Числа, даты и время',
        bloque: 8,
        content: {
          explanation: 'Los números, las fechas y la hora son fundamentales en cualquier interacción básica.',
          explanation_ru: 'Числа, даты и время — основа любого базового общения.',
          rule: 'La hora: Es la una. Son las dos/tres… Son las X y media / y cuarto / menos cuarto. Fechas: el + número + de + mes. Años: dos mil veinticinco.',
          rule_ru: 'Время: Es la una (час). Son las dos (два часа). Son las tres y media (половина четвёртого). Son las cuatro y cuarto (четверть пятого). Son las cinco menos cuarto (без четверти пять). Дата: el 15 de marzo.',
          examples: [
            { es: '¿Qué hora es? Son las tres y media.', ru: 'Который час? Половина четвёртого.' },
            { es: 'Nací el 15 de marzo de 1990.', ru: 'Я родился 15 марта 1990 года.' },
            { es: 'La reunión es el lunes a las diez.', ru: 'Встреча в понедельник в десять часов.' },
          ],
        },
      },
    ],
  },
  {
    id: 9,
    title: 'Comunicación Funcional',
    title_ru: 'Функциональная коммуникация',
    emoji: '💬',
    lessons: [
      {
        id: '9.1',
        title: 'Pedir y dar información',
        title_ru: 'Запрашивать и давать информацию',
        bloque: 9,
        content: {
          explanation: 'Fórmulas para solicitar y proporcionar información en contextos cotidianos.',
          explanation_ru: 'Устойчивые формулы для запроса и предоставления информации в повседневных ситуациях.',
          rule: 'Perdona/Perdone (неформально/формально), ¿puede decirme…? (не могли бы вы сказать?), ¿Sabe si…? (Вы знаете, есть ли…?), ¿Me puede ayudar? (Не могли бы вы помочь?)',
          rule_ru: 'Perdona (извини, неформально) / Perdone (извините, формально). ¿Puede decirme…? (Не могли бы вы сказать…?). ¿Sabe si…? (Вы знаете, есть ли…?). ¿Me puede ayudar? (Не могли бы вы помочь?)',
          examples: [
            { es: 'Perdona, ¿sabes dónde está la biblioteca?', ru: 'Извини, ты знаешь, где библиотека?' },
            { es: '¿Me puede decir a qué hora abre el banco?', ru: 'Не могли бы вы сказать, во сколько открывается банк?' },
            { es: 'Claro, está a dos calles de aquí.', ru: 'Конечно, это в двух кварталах отсюда.' },
          ],
        },
      },
      {
        id: '9.2',
        title: 'Hacer y responder invitaciones',
        title_ru: 'Приглашать и отвечать на приглашения',
        bloque: 9,
        content: {
          explanation: 'Cómo invitar a alguien, aceptar y declinar educadamente.',
          explanation_ru: 'Как пригласить кого-то, принять приглашение и вежливо отказать.',
          rule: '¿Te apetece/Te gustaría + inf? (Не хочешь...?). Aceptar: ¡Claro que sí! / ¡Con mucho gusto! Rechazar: Lo siento, es que… / Me encantaría pero…',
          rule_ru: 'Пригласить: ¿Te apetece…? / ¿Te gustaría…? (Не хочешь...?). Принять: ¡Claro que sí! (Конечно!) / ¡Con mucho gusto! (С удовольствием!). Отказать: Lo siento, es que… (Извини, дело в том, что…) / Me encantaría pero… (Я бы с радостью, но…)',
          examples: [
            { es: '¿Te apetece venir a cenar el viernes?', ru: 'Не хочешь прийти на ужин в пятницу?' },
            { es: 'Me encantaría, pero tengo un compromiso.', ru: 'С удовольствием, но у меня другие планы.' },
            { es: '¡Claro que sí! ¿A qué hora?', ru: 'Конечно! В котором часу?' },
          ],
        },
      },
      {
        id: '9.3',
        title: 'Expresar gustos y preferencias',
        title_ru: 'Выражать симпатии и предпочтения',
        bloque: 9,
        content: {
          explanation: 'La estructura gustar es peculiar: el sujeto gramatical es lo que gusta, no la persona. Es un error muy común del rusohablante.',
          explanation_ru: 'Конструкция с gustar необычна: грамматическое подлежащее — то, что нравится, а не человек. Это частая ошибка русскоязычных.',
          rule: 'Me gusta + sustantivo singular / infinitivo. Me gustan + sustantivo plural. Gradación: me encanta (обожаю), me gusta (нравится), no me gusta (не нравится), no me gusta nada.',
          rule_ru: 'Me gusta + существительное ед.ч. / инфинитив. Me gustan + существительное мн.ч. Степени: me encanta (обожаю), me gusta mucho (очень нравится), me gusta (нравится), no me gusta (не нравится), no me gusta nada (совсем не нравится).',
          examples: [
            { es: 'Me gusta el fútbol. / Me gustan los gatos.', ru: 'Мне нравится футбол. / Мне нравятся кошки.' },
            { es: 'Me encanta cocinar.', ru: 'Я обожаю готовить.' },
            { es: 'A mi hermano le gusta la música clásica.', ru: 'Моему брату нравится классическая музыка.' },
          ],
          note_ru: '"Me gusta" — это не возвратная конструкция. "Me" здесь — дательный падеж ("мне"). Подлежащее — "el fútbol", не "я". Отсюда: "Me gusta el fútbol" (ед.ч.) vs "Me GUSTAN los gatos" (мн.ч.) — глагол согласуется с тем, что нравится.',
        },
        exerciseLink: '/practica',
      },
      {
        id: '9.4',
        title: 'Hablar de planes y proyectos',
        title_ru: 'Говорить о планах и проектах',
        bloque: 9,
        content: {
          explanation: 'Cómo hablar de intenciones, planes futuros y proyectos.',
          explanation_ru: 'Как говорить о намерениях, планах на будущее и проектах.',
          rule: 'Ir a + inf (конкретный план). Querer/pensar/tener intención de + inf (намерение). Esperar + inf (надежда).',
          rule_ru: 'Ir a + инфинитив (конкретный план). Querer + инфинитив (хотеть). Pensar + инфинитив (думать/планировать). Tener intención de + инфинитив (намереваться). Esperar + инфинитив (надеяться).',
          examples: [
            { es: 'Este verano voy a visitar Barcelona.', ru: 'Этим летом я собираюсь посетить Барселону.' },
            { es: 'Quiero aprender a cocinar paella.', ru: 'Я хочу научиться готовить паэлью.' },
            { es: 'Espero terminar el proyecto antes del viernes.', ru: 'Я надеюсь закончить проект до пятницы.' },
          ],
        },
      },
      {
        id: '9.5',
        title: 'Describir personas, lugares y objetos',
        title_ru: 'Описывать людей, места и предметы',
        bloque: 9,
        content: {
          explanation: 'Vocabulario y estructuras para hacer descripciones detalladas.',
          explanation_ru: 'Лексика и структуры для подробного описания людей, мест и предметов.',
          rule: 'SER + adj (постоянные черты). ESTAR + adj (состояния). TENER + sustantivo (обладать чертой). PARECER + adj (выглядеть как).',
          rule_ru: 'SER + прилагательное (постоянные черты: Es alto, Es simpático). ESTAR + прилагательное (состояния: Está cansado, Está limpio). TENER + существительное (Tiene los ojos azules). PARECER + прилагательное (Parece caro — выглядит дорогим).',
          examples: [
            { es: 'Mi amigo es alto, moreno y muy simpático.', ru: 'Мой друг высокий, смуглый и очень приятный.' },
            { es: 'La ciudad está muy limpia y bien organizada.', ru: 'Город очень чистый и хорошо организованный.' },
            { es: 'Este restaurante parece caro, pero no lo es.', ru: 'Этот ресторан выглядит дорогим, но это не так.' },
          ],
        },
      },
      {
        id: '9.6',
        title: 'Narrar en pasado',
        title_ru: 'Рассказывать в прошедшем времени',
        bloque: 9,
        content: {
          explanation: 'Cómo contar una historia combinando el Indefinido (acciones puntuales) y el Imperfecto (contexto y descripciones).',
          explanation_ru: 'Как рассказать историю, сочетая Indefinido (точечные события) и Imperfecto (фон и описания).',
          rule: 'Conectores narrativos: primero (сначала), luego/después (потом), entonces (тогда), de repente (вдруг), al final (в итоге). Imperfecto = фон; Indefinido = события.',
          rule_ru: 'Связки: primero (сначала), luego/después (потом/затем), entonces (тогда/после этого), de repente (вдруг/внезапно), al final (в конце концов/в итоге). IMPERFECTO описывает фон; INDEFINIDO — сами события.',
          examples: [
            { es: 'Era una tarde tranquila cuando de repente sonó el teléfono.', ru: 'Был тихий вечер, когда вдруг зазвонил телефон.' },
            { es: 'Primero desayuné, luego fui al trabajo.', ru: 'Сначала я позавтракал, потом пошёл на работу.' },
            { es: 'Al final todo salió bien.', ru: 'В итоге всё закончилось хорошо.' },
          ],
        },
      },
      {
        id: '9.7',
        title: 'Expresar opinión básica',
        title_ru: 'Выражать базовое мнение',
        bloque: 9,
        content: {
          explanation: 'Fórmulas para dar tu opinión, estar de acuerdo y expresar duda.',
          explanation_ru: 'Устойчивые формулы для выражения мнения, согласия и сомнения.',
          rule: 'Creo que… / Pienso que… / Para mí… / En mi opinión… / Me parece que… + indicativo. Acuerdo: Tienes razón (Ты прав). Desacuerdo: No estoy de acuerdo porque…',
          rule_ru: 'Creo que… (Я думаю, что…) / Pienso que… (Считаю, что…) / Para mí… (По-моему…) / En mi opinión… (По моему мнению…) / Me parece que… (Мне кажется, что…). Согласие: Tienes razón (Ты прав). Несогласие: No estoy de acuerdo (Я не согласен).',
          examples: [
            { es: 'Creo que el español es un idioma muy bonito.', ru: 'Я думаю, что испанский — очень красивый язык.' },
            { es: 'Para mí, lo más difícil es el subjuntivo.', ru: 'По-моему, самое сложное — это субхунтив.' },
            { es: 'Tienes razón, es complicado.', ru: 'Ты прав, это сложно.' },
          ],
        },
      },
      {
        id: '9.8',
        title: 'Pedir en tiendas, transportes y restaurantes',
        title_ru: 'Заказывать в магазинах, транспорте и ресторанах',
        bloque: 9,
        content: {
          explanation: 'Fórmulas de cortesía para transacciones cotidianas.',
          explanation_ru: 'Вежливые формулы для повседневных бытовых ситуаций: магазин, транспорт, ресторан.',
          rule: 'Quería / Quisiera / Me pone + lo que quieres (в баре). ¿Me cobra? (Можно рассчитаться?) ¿Cuánto es? (Сколько?) ¿Me da un recibo? (Дайте чек.)',
          rule_ru: 'Quería / Quisiera (Я бы хотел...) — везде. Me pone / Póngame (Дайте/налейте мне...) — в баре. ¿Me cobra? (Можно рассчитаться?). ¿Cuánto es? (Сколько стоит?). La cuenta (счёт в ресторане).',
          examples: [
            { es: 'Quería un café con leche y una tostada.', ru: 'Я бы хотел кофе с молоком и тост.' },
            { es: 'Un billete de ida y vuelta a Sevilla.', ru: 'Билет туда и обратно до Севильи.' },
            { es: '¿Me cobra? ¿Tiene cambio de 50 euros?', ru: 'Можно рассчитаться? Есть сдача с 50 евро?' },
          ],
        },
      },
    ],
  },
  {
    id: 10,
    title: 'Errores típicos del Ruso',
    title_ru: 'Типичные ошибки русскоязычных',
    emoji: '⚠️',
    lessons: [
      {
        id: '10.1',
        title: 'Olvidar los artículos',
        title_ru: 'Забывать артикли',
        bloque: 10,
        content: {
          explanation: 'El error más frecuente: omitir el artículo porque en ruso no existe esta categoría gramatical.',
          explanation_ru: 'Самая частая ошибка: пропустить артикль, потому что в русском этой грамматической категории нет. Помни: в испанском ВСЕГДА нужно выбрать: el/la, un/una или ничего.',
          rule: 'Siempre hay que decidir: ¿artículo determinado (el/la), indeterminado (un/una) o sin artículo? No existe la opción "simplemente no poner nada por defecto".',
          rule_ru: 'Всегда нужно выбрать: определённый (el/la), неопределённый (un/una) или без артикля. Нейтрального варианта "просто ничего" не существует. Каждое существительное требует сознательного выбора.',
          examples: [
            { es: '✗ Tengo perro. ✓ Tengo un perro.', ru: 'У меня есть собака → un perro (первое упоминание)' },
            { es: '✗ Voy a mercado. ✓ Voy al mercado.', ru: 'Иду на рынок → al mercado (конкретный, известный)' },
            { es: '✗ Me gusta música. ✓ Me gusta la música.', ru: 'Мне нравится музыка → la música (музыка как категория)' },
          ],
          note_ru: 'Подсказка: если в английском было бы "the" → скорее всего el/la. "a/an" → un/una. Без артикля (профессии, национальности как прилагательные) → и в испанском тоже без.',
        },
      },
      {
        id: '10.2',
        title: 'Confundir ser y estar',
        title_ru: 'Путать ser и estar',
        bloque: 10,
        content: {
          explanation: 'Usar ser donde va estar y viceversa es uno de los errores más notorios.',
          explanation_ru: 'Путаница ser/estar — одна из самых заметных ошибок. Русскоязычные склонны опускать глагол или всегда использовать ser ("более постоянный"), что неверно.',
          rule: 'ESTAR para estados, ubicación, resultados. SER para identidad, características inherentes, hora, eventos, material.',
          rule_ru: 'ESTAR — для состояний, местоположения, результатов изменений. SER — для идентичности, постоянных характеристик, времени, мероприятий, материала.',
          examples: [
            { es: '✗ Soy cansado. ✓ Estoy cansado.', ru: 'Я устал — временное состояние → ESTAR' },
            { es: '✗ Estoy médico. ✓ Soy médico.', ru: 'Я врач — профессия → SER' },
            { es: '✗ El museo es en el centro. ✓ El museo está en el centro.', ru: 'Музей в центре — местоположение → ESTAR' },
          ],
        },
        exerciseLink: '/practica',
      },
      {
        id: '10.3',
        title: 'Concordancia de género en adjetivos',
        title_ru: 'Согласование рода в прилагательных',
        bloque: 10,
        content: {
          explanation: 'En ruso los adjetivos también concuerdan, pero a veces el rusohablante olvida la concordancia de género en español.',
          explanation_ru: 'В русском прилагательные тоже согласуются, но иногда русскоязычные забывают про согласование в роде в испанском — особенно при словах-исключениях.',
          rule: 'El adjetivo SIEMPRE concuerda en género y número. No existe forma "neutra". Presta atención especial a sustantivos con género no evidente.',
          rule_ru: 'Прилагательное ВСЕГДА согласуется в роде и числе. Нейтральной формы нет. Особое внимание — к существительным с неочевидным родом (el problema, la mano).',
          examples: [
            { es: '✗ Mi hermana es alto. ✓ Mi hermana es alta.', ru: 'Моя сестра высокая — женский род → alta' },
            { es: '✗ Unos personas interesante. ✓ Unas personas interesantes.', ru: 'Несколько интересных людей — мн.ч. → interesantes' },
            { es: 'El problema es serio y complicado. (correcto)', ru: '"problema" — мужского рода (исключение!) → serio, complicado' },
          ],
        },
      },
      {
        id: '10.4',
        title: 'Uso incorrecto de hay/está/están',
        title_ru: 'Неправильное употребление hay/está/están',
        bloque: 10,
        content: {
          explanation: 'La confusión entre "hay" y "está/están" es muy común para rusohablantes que usan "есть" o simplemente omiten el verbo.',
          explanation_ru: 'Путаница между "hay" и "está/están" очень распространена среди русскоязычных, привыкших к "есть" или вообще к отсутствию глагола.',
          rule: 'HAY = существование (есть/имеется) — неизменяемо. ESTÁ/ESTÁN = местонахождение уже известного предмета.',
          rule_ru: 'HAY = существование нового объекта (есть, имеется) — форма НИКОГДА не меняется по числу. ESTÁ/ESTÁN = местонахождение уже упомянутого, конкретного предмета.',
          examples: [
            { es: '✗ Está un supermercado aquí. ✓ Hay un supermercado aquí.', ru: 'Тут есть супермаркет → HAY (существование)' },
            { es: '✗ Hay el supermercado en la calle Mayor. ✓ El supermercado está en la calle Mayor.', ru: 'Супермаркет находится... → ESTÁ (известный объект)' },
            { es: '✗ Están mucha gente. ✓ Hay mucha gente.', ru: 'Много людей → HAY (безличное существование)' },
          ],
        },
      },
      {
        id: '10.5',
        title: 'Traducir literalmente desde el ruso (calcos)',
        title_ru: 'Дословный перевод с русского (кальки)',
        bloque: 10,
        content: {
          explanation: 'Los calcos son traducciones literales que suenan incorrectas. El ruso y el español estructuran algunas expresiones de forma muy diferente.',
          explanation_ru: 'Кальки — дословные переводы, которые звучат неправильно. Русский и испанский по-разному строят некоторые выражения.',
          rule: 'No traduzcas palabra por palabra. Aprende las expresiones como bloques fijos.',
          rule_ru: 'Не переводи слово в слово. Учи выражения как готовые блоки.',
          examples: [
            { es: '✗ Tengo X años de edad. ✓ Tengo X años.', ru: 'Мне X лет → tener años (не "ser" и не "de edad")' },
            { es: '✗ Estoy de acuerdo con eso que dices. ✓ Estoy de acuerdo contigo.', ru: 'Я согласен с тобой → contigo, не калька с "с тем что говоришь"' },
            { es: '✗ Me es difícil. ✓ Me resulta difícil / Es difícil para mí.', ru: 'Мне трудно → resulta difícil, не дословный калькo' },
          ],
        },
      },
      {
        id: '10.6',
        title: 'Falsos amigos ruso-español',
        title_ru: 'Ложные друзья переводчика (рус.–исп.)',
        bloque: 10,
        content: {
          explanation: 'Palabras que se parecen en ruso y español pero tienen significados distintos. Pueden causar malentendidos graves.',
          explanation_ru: 'Слова, которые похожи по звучанию в русском и испанском, но означают разное. Могут привести к серьёзным недоразумениям.',
          rule: 'Presta atención especial a palabras de origen latino o griego que existen en ambas lenguas pero con significados divergentes.',
          rule_ru: 'Обращай особое внимание на слова латинского или греческого происхождения, которые есть в обоих языках, но с разным значением.',
          examples: [
            { es: 'embarazada = беременная (¡NO смущённая!)', ru: '"Estoy embarazada" — я беременна, НЕ "я смущена"' },
            { es: 'constipado = простуженный (¡NO запор!)', ru: '"Estar constipado" = иметь насморк/простуду, НЕ запор' },
            { es: 'actual = нынешний/текущий (¡NO настоящий в смысле "реальный"!)', ru: '"El presidente actual" = нынешний президент, НЕ "настоящий"' },
          ],
          note_ru: '"Estoy embarazada" — означает "я беременна", а не "мне неловко". Это один из самых знаменитых ложных друзей переводчика. Запомни раз и навсегда!',
        },
      },
      {
        id: '10.7',
        title: 'Omitir preposiciones o copiarlas del ruso',
        title_ru: 'Пропуск предлогов или их калька с русского',
        bloque: 10,
        content: {
          explanation: 'El ruso expresa las relaciones gramaticales con casos. El español lo hace con preposiciones. No siempre hay correspondencia directa.',
          explanation_ru: 'Русский выражает грамматические отношения через падежи, испанский — через предлоги. Прямого соответствия нет, и типичные ошибки возникают именно здесь.',
          rule: 'No omitas la preposición "a" con objeto directo de persona. No uses "en" donde va "a" para destinos. Aprende las preposiciones de cada verbo como parte del mismo.',
          rule_ru: 'Не пропускай предлог "a" при одушевлённом прямом дополнении. Не используй "en" вместо "a" при указании направления. Учи предлог как неотъемлемую часть глагола.',
          examples: [
            { es: '✗ Veo María. ✓ Veo a María. ("a" personal)', ru: 'Я вижу Марию → "a" перед именем/лицом обязательна' },
            { es: '✗ Voy en Madrid. ✓ Voy a Madrid.', ru: 'Еду в Мадрид → "в" по-русски, но "a" в испанском (движение)' },
            { es: '✗ Pienso en ir. ✓ Pienso ir. (намерение)', ru: 'Думаю поехать → pensar + inf (без "en") = намерение' },
          ],
        },
      },
    ],
  },
]

export function getLessonById(id: string): TheoryLesson | undefined {
  for (const block of theoryBlocks) {
    const lesson = block.lessons.find((l) => l.id === id)
    if (lesson) return lesson
  }
  return undefined
}

export function getAdjacentLessons(id: string): { prev?: TheoryLesson; next?: TheoryLesson } {
  const allLessons = theoryBlocks.flatMap((b) => b.lessons)
  const index = allLessons.findIndex((l) => l.id === id)
  return {
    prev: index > 0 ? allLessons[index - 1] : undefined,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : undefined,
  }
}
