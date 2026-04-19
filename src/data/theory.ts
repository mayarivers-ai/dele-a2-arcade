export interface TheoryExample {
  es: string
  ru: string
}

export interface TheoryLesson {
  id: string
  title: string
  bloque: number
  content: {
    explanation: string
    rule: string
    examples: TheoryExample[]
    note?: string
  }
  exerciseLink?: string
}

export interface TheoryBlock {
  id: number
  title: string
  emoji: string
  lessons: TheoryLesson[]
}

export const theoryBlocks: TheoryBlock[] = [
  {
    id: 0,
    title: 'Fundamentos',
    emoji: '🔤',
    lessons: [
      {
        id: '0.1',
        title: 'El alfabeto español y la pronunciación',
        bloque: 0,
        content: {
          explanation:
            'El español usa el alfabeto latino con 27 letras. A diferencia del ruso, cada letra tiene casi siempre el mismo sonido — no hay reducción vocálica ni consonantes suaves/duras.',
          rule: 'En español, las vocales (a, e, i, o, u) siempre suenan igual, independientemente de la posición en la palabra. No existe la "o átona" que suena como "a" como en ruso.',
          examples: [
            { es: 'casa → ca-sa (no "casa" reducida)', ru: 'дом — гласные всегда чёткие' },
            { es: 'mesa → me-sa', ru: 'стол — "е" всегда звучит как "е"' },
            { es: 'libro → li-bro', ru: 'книга — все гласные произносятся чётко' },
          ],
          note: 'En ruso las vocales átonas se reducen (молоко suena "малако"). En español esto NO ocurre: todas las vocales se pronuncian igual, estén o no bajo el acento.',
        },
      },
      {
        id: '0.2',
        title: 'El español no tiene casos gramaticales',
        bloque: 0,
        content: {
          explanation:
            'El ruso tiene 6 casos que cambian la terminación de las palabras según su función en la frase. El español no tiene casos: la posición en la oración y las preposiciones hacen ese trabajo.',
          rule: 'En español el sustantivo nunca cambia su forma según la función gramatical. Se usan preposiciones (a, de, con, en…) para indicar relaciones.',
          examples: [
            { es: 'Veo a Juan (objeto directo)', ru: 'Я вижу Хуана — винительный падеж en ruso' },
            { es: 'El libro de Juan (posesión)', ru: 'Книга Хуана — родительный падеж en ruso' },
            { es: 'Hablo con Juan (compañía)', ru: 'Я говорю с Хуаном — творительный падеж en ruso' },
          ],
          note: 'El ruso usa desinencias (-а, -у, -ом, -е…) para lo que el español expresa con preposiciones. No intentes "traducir" el caso: busca la preposición española equivalente.',
        },
      },
      {
        id: '0.3',
        title: 'Acento y entonación: el español es musical',
        bloque: 0,
        content: {
          explanation:
            'El español tiene un ritmo silábico — todas las sílabas duran aproximadamente lo mismo. El ruso tiene ritmo acentual, con sílabas tónicas más largas y átonas muy reducidas.',
          rule: 'El acento en español está indicado por tilde (´) cuando no sigue las reglas generales. Las palabras llanas (acento en penúltima sílaba) son las más comunes y no llevan tilde si terminan en vocal, n o s.',
          examples: [
            { es: 'caSA, meSA, liBRO (llanas, sin tilde)', ru: 'ударение на предпоследнем слоге' },
            { es: 'caFÉ, mamá, sofÁ (agudas, con tilde)', ru: 'ударение на последнем слоге — тильда обязательна' },
            { es: 'MÚsica, télefono (esdrújulas, siempre tilde)', ru: 'ударение на третьем слоге — всегда с тильдой' },
          ],
        },
      },
      {
        id: '0.4',
        title: 'Cómo leer fonética española',
        bloque: 0,
        content: {
          explanation:
            'El español es muy fonético: casi siempre se escribe como se pronuncia. Los pocos sonidos que no existen en ruso se aprenden rápido.',
          rule: 'Sonidos clave: la "j" y "g" (ante e/i) suenan como la х rusa pero más suave. La "r" simple es como la "р" rusa entre vocales. La "rr" y la "r" al inicio es vibrante múltiple.',
          examples: [
            { es: 'jardín [xardín]', ru: 'как "х" в слове "хорошо" — jardín' },
            { es: 'pero [péɾo] vs perro [péro]', ru: '"р" одиночная vs "рр" раскатистая' },
            { es: 'ciudad [θjuðáð] (España) / [sjuðáð] (Latinoamérica)', ru: '"с" в Латинской Америке, "θ" как в английском "think" в Испании' },
          ],
          note: 'La "v" y la "b" suenan igual en español moderno. No hay diferencia: vino y bino suenan idéntico. Para el ruso hablante esto puede ser raro al principio.',
        },
      },
    ],
  },
  {
    id: 1,
    title: 'El Sustantivo y el Artículo',
    emoji: '📝',
    lessons: [
      {
        id: '1.1',
        title: 'Género masculino y femenino',
        bloque: 1,
        content: {
          explanation:
            'El español solo tiene dos géneros: masculino y femenino. El ruso tiene tres (masculino, femenino, neutro). En español todos los objetos son "él" o "ella" — no existe el neutro para sustantivos comunes.',
          rule: 'Regla general: palabras terminadas en -o → masculino; en -a → femenino. Hay muchas excepciones importantes que hay que memorizar.',
          examples: [
            { es: 'el libro (m), la mesa (f)', ru: 'книга (ж), стол (м) — в испанском наоборот для "стол"!' },
            { es: 'el problema, el mapa, el día', ru: 'исключения: слова на -а, но мужского рода' },
            { es: 'la mano, la foto, la radio', ru: 'исключения: слова на -о, но женского рода' },
          ],
          note: 'En ruso el género suele deducirse de la terminación con mucha precisión. En español también, pero hay más excepciones. Lo mejor es aprender el artículo junto con cada sustantivo nuevo: no "libro" sino "el libro".',
        },
      },
      {
        id: '1.2',
        title: 'Artículos determinados: el, la, los, las',
        bloque: 1,
        content: {
          explanation:
            'El artículo determinado equivale al concepto de "ese específico" o "ya sabemos de cuál hablamos". En ruso NO existe este concepto gramatical — es uno de los mayores retos para rusohablantes.',
          rule: 'el (m. singular), la (f. singular), los (m. plural), las (f. plural). Se usa cuando el hablante y el oyente saben de qué objeto concreto se habla.',
          examples: [
            { es: '¿Dónde está el baño?', ru: 'Где туалет? (конкретный, единственный в контексте)' },
            { es: 'Me gusta la música.', ru: 'Мне нравится музыка (музыка вообще, как категория)' },
            { es: 'Los estudiantes llegaron tarde.', ru: 'Студенты опоздали (все, о ком шла речь)' },
          ],
          note: 'En ruso no hay artículos y el contexto lo hace todo. En español tienes que elegir: el/la (determinado), un/una (indeterminado) o nada. Al principio parecerá arbitrario — con el tiempo se vuelve intuitivo.',
        },
        exerciseLink: '/practica',
      },
      {
        id: '1.3',
        title: 'Artículos indeterminados: un, una, unos, unas',
        bloque: 1,
        content: {
          explanation:
            'El artículo indeterminado introduce algo nuevo en la conversación, algo que el oyente no conoce todavía, equivalente al concepto "un cierto, algún".',
          rule: 'un (m. singular), una (f. singular), unos (m. plural), unas (f. plural). Se usa la primera vez que mencionamos algo, o cuando es uno entre muchos posibles.',
          examples: [
            { es: 'Tengo un perro.', ru: 'У меня есть собака (первое упоминание, неизвестная читателю)' },
            { es: 'Busco un apartamento.', ru: 'Я ищу квартиру (любую, не конкретную)' },
            { es: 'Compré unas naranjas.', ru: 'Я купил апельсины (несколько, не конкретных)' },
          ],
        },
      },
      {
        id: '1.4',
        title: 'Cuándo NO usar artículo',
        bloque: 1,
        content: {
          explanation:
            'No siempre se usa artículo. Hay contextos claros donde se omite, y aprenderlos evita el error de "sobrearticular".',
          rule: 'No se usa artículo con: profesiones tras ser/estar, días de la semana con expresiones habituales, meses, nacionalidades como adjetivo, y tras la preposición "de" en muchas expresiones.',
          examples: [
            { es: 'Soy médico. (profesión)', ru: 'Я врач — без артикля после ser' },
            { es: 'Trabajo los lunes. (hábito)', ru: 'Я работаю по понедельникам' },
            { es: 'un vaso de agua (partitivo)', ru: 'стакан воды — de + sustantivo sin artículo' },
          ],
          note: 'En ruso nunca hay artículo, así que el error más común del rusohablante es omitirlo cuando sí hace falta, no el contrario. Aunque también existe el error de añadirlo donde no va (con profesiones).',
        },
      },
      {
        id: '1.5',
        title: 'Plural: reglas y excepciones',
        bloque: 1,
        content: {
          explanation:
            'El plural en español es mucho más simple que en ruso. En ruso el plural cambia según el caso y el género. En español hay dos reglas principales.',
          rule: 'Palabras terminadas en vocal → añade -s. Palabras terminadas en consonante → añade -es. Palabras terminadas en -z → cambia -z por -ces.',
          examples: [
            { es: 'libro → libros, mesa → mesas', ru: 'книга → книги (просто + s)' },
            { es: 'ciudad → ciudades, papel → papeles', ru: 'город → города (+ es tras согласной)' },
            { es: 'lápiz → lápices, vez → veces', ru: 'карандаш → карандаши (-z → -ces)' },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Los Pronombres',
    emoji: '👤',
    lessons: [
      {
        id: '2.1',
        title: 'Pronombres personales sujeto',
        bloque: 2,
        content: {
          explanation:
            'En español, los pronombres sujeto (yo, tú, él…) son opcionales porque la terminación del verbo ya indica la persona. En ruso también se omiten, pero por razones ligeramente distintas.',
          rule: 'yo, tú, él/ella/usted, nosotros/as, vosotros/as, ellos/ellas/ustedes. Se usan para énfasis o para evitar ambigüedad, no de forma obligatoria.',
          examples: [
            { es: 'Hablo español. (sin pronombre, normal)', ru: 'Я говорю по-испански (pronombre opcional)' },
            { es: 'YO no lo sé, pero ÉL sí. (énfasis)', ru: 'Я не знаю, а он знает (противопоставление)' },
            { es: 'Usted habla muy bien. (formal)', ru: '"Вы" formal — se usa siempre en contextos formales' },
          ],
          note: '"Usted" es la forma de cortesía singular (como el "Вы" ruso). En plural es "ustedes". En España también existe "vosotros" para el plural informal, pero en Latinoamérica se usa "ustedes" para todo.',
        },
      },
      {
        id: '2.2',
        title: 'Pronombres de objeto directo',
        bloque: 2,
        content: {
          explanation:
            'Los pronombres de objeto directo reemplazan al sustantivo que recibe directamente la acción del verbo. En ruso esto se expresa con el caso acusativo.',
          rule: 'me, te, lo/la, nos, os, los/las. Van ANTES del verbo conjugado. Con infinitivo o gerundio pueden ir también después (enclíticos).',
          examples: [
            { es: '¿Ves el libro? Sí, lo veo.', ru: 'Ты видишь книгу? Да, я её вижу.' },
            { es: '¿Llamas a María? Sí, la llamo.', ru: 'Ты звонишь Марии? Да, я ей звоню.' },
            { es: 'Quiero verlo. / Lo quiero ver.', ru: 'Я хочу его увидеть (dos posiciones posibles)' },
          ],
          note: 'En español hay una distinción lo (m) / la (f) que en ruso corresponde al género del sustantivo reemplazado. Presta atención al género del objeto.',
        },
      },
      {
        id: '2.3',
        title: 'Pronombres de objeto indirecto',
        bloque: 2,
        content: {
          explanation:
            'Los pronombres de objeto indirecto indican a quién va dirigida la acción. En ruso se expresa con el dativo.',
          rule: 'me, te, le, nos, os, les. Van antes del verbo. Cuando van con objeto directo de 3ª persona, "le/les" se convierte en "se" (para evitar la secuencia le lo).',
          examples: [
            { es: 'Te doy el libro.', ru: 'Я тебе даю книгу (dativo: тебе)' },
            { es: 'Le hablo a ella.', ru: 'Я говорю ей (dativo: ей)' },
            { es: 'Se lo doy. (= Le lo doy, incorrecto)', ru: 'Я ему/ей это даю (le → se antes de lo/la)' },
          ],
        },
      },
      {
        id: '2.4',
        title: 'Pronombres reflexivos',
        bloque: 2,
        content: {
          explanation:
            'Los pronombres reflexivos indican que la acción recae sobre el mismo sujeto. En ruso existe el sufijo -ся/-сь para verbos reflexivos.',
          rule: 'me, te, se, nos, os, se. Equivalen al -ся ruso en muchos verbos. Van antes del verbo conjugado.',
          examples: [
            { es: 'Me llamo Ana.', ru: 'Меня зовут Аня (llamarse → звать + ся)' },
            { es: 'Me ducho por la mañana.', ru: 'Я принимаю душ утром (ducharse → мыться)' },
            { es: 'Nos levantamos a las 7.', ru: 'Мы встаём в 7 (levantarse → вставать)' },
          ],
          note: 'No todos los verbos reflexivos en español corresponden a verbos con -ся en ruso y viceversa. Por ejemplo, "me gusta" no es reflexivo en sentido estricto, pero usa el pronombre de dativo.',
        },
        exerciseLink: '/practica',
      },
      {
        id: '2.5',
        title: 'Pronombres posesivos',
        bloque: 2,
        content: {
          explanation:
            'Los posesivos en español tienen dos formas: los átonos (antes del sustantivo) y los tónicos (después o solos). En ruso solo hay una forma que concuerda con el sustantivo.',
          rule: 'Átonos: mi/mis, tu/tus, su/sus, nuestro/a/os/as, vuestro/a/os/as, su/sus. Tónicos: mío/a/os/as, tuyo/a/os/as, suyo/a/os/as…',
          examples: [
            { es: 'mi libro / el libro mío', ru: 'моя книга (ambas formas son posibles)' },
            { es: 'Esta mesa es tuya.', ru: 'Этот стол твой (tónico después del verbo ser)' },
            { es: 'nuestros amigos', ru: 'наши друзья (concuerda en género y número)' },
          ],
        },
      },
      {
        id: '2.6',
        title: 'Pronombres demostrativos',
        bloque: 2,
        content: {
          explanation:
            'Los demostrativos señalan la distancia entre el objeto y el hablante. El español tiene tres niveles de distancia; el ruso moderno solo usa dos (этот/тот).',
          rule: 'este/esta/estos/estas (cerca del hablante), ese/esa/esos/esas (cerca del oyente o distancia media), aquel/aquella/aquellos/aquellas (lejos de ambos).',
          examples: [
            { es: 'Este libro es mío. (aquí, conmigo)', ru: 'Эта книга моя (рядом со мной)' },
            { es: 'Ese coche es tuyo. (ahí, contigo)', ru: 'Та машина твоя (рядом с тобой)' },
            { es: 'Aquel edificio es muy antiguo. (allí, lejos)', ru: 'Вон то здание очень старое (далеко)' },
          ],
        },
      },
    ],
  },
  {
    id: 3,
    title: 'El Verbo — Presente',
    emoji: '⚡',
    lessons: [
      {
        id: '3.1',
        title: 'Conjugación regular: -AR, -ER, -IR',
        bloque: 3,
        content: {
          explanation:
            'Los verbos regulares siguen patrones fijos según su terminación en infinitivo. En español, la terminación del verbo indica la persona — no se necesita el pronombre sujeto.',
          rule: '-AR: hablo, hablas, habla, hablamos, habláis, hablan. -ER: como, comes, come, comemos, coméis, comen. -IR: vivo, vives, vive, vivimos, vivís, viven.',
          examples: [
            { es: 'hablar → hablo, hablas, habla…', ru: 'говорить — hablar, окончания -o/-as/-a/-amos/-áis/-an' },
            { es: 'comer → como, comes, come…', ru: 'есть (кушать) — comer, окончания -o/-es/-e/-emos/-éis/-en' },
            { es: 'vivir → vivo, vives, vive…', ru: 'жить — vivir, окончания -o/-es/-e/-imos/-ís/-en' },
          ],
        },
        exerciseLink: '/arcade',
      },
      {
        id: '3.2',
        title: 'Los verbos irregulares más frecuentes',
        bloque: 3,
        content: {
          explanation:
            'Hay verbos muy usados que no siguen los patrones regulares. Son irregulares en la 1ª persona singular o en todas las personas. Hay que memorizarlos.',
          rule: 'Los más importantes: ser (soy, eres, es…), estar (estoy, estás, está…), ir (voy, vas, va…), tener (tengo, tienes…), hacer (hago, haces…), poder (puedo, puedes…), querer (quiero, quieres…).',
          examples: [
            { es: 'ser: soy / eres / es / somos / sois / son', ru: 'быть (постоянное): я есть/являюсь...' },
            { es: 'ir: voy / vas / va / vamos / vais / van', ru: 'идти/ехать: iду → voy (totalmente irregular)' },
            { es: 'tener: tengo / tienes / tiene / tenemos…', ru: 'иметь: tengo (1ª persona irregular)' },
          ],
        },
        exerciseLink: '/arcade',
      },
      {
        id: '3.3',
        title: 'SER vs ESTAR',
        bloque: 3,
        content: {
          explanation:
            'Este es el error más común para rusohablantes. El ruso usa una sola cópula (быть, que se omite en presente). El español tiene DOS verbos: ser y estar, con usos bien diferenciados.',
          rule: 'SER: identidad permanente o inherente (origen, nacionalidad, profesión, material, hora, eventos). ESTAR: estados temporales, ubicación, resultados de cambio.',
          examples: [
            { es: 'Soy ruso. (origen/nacionalidad — ser)', ru: 'Я русский — идентичность, постоянно' },
            { es: 'Estoy cansado. (estado temporal — estar)', ru: 'Я устал — временное состояние' },
            { es: 'El café es caliente. / El café está caliente.', ru: 'Кофе горячий (característica vs. estado actual)' },
          ],
          note: 'En ruso быть se omite en presente: "Я врач", "Он здесь". En español SIEMPRE hay verbo: "Soy médico" (ser), "Está aquí" (estar). La ubicación siempre usa ESTAR (excepto eventos: "La fiesta es en mi casa").',
        },
        exerciseLink: '/practica',
      },
      {
        id: '3.4',
        title: 'Verbos reflexivos',
        bloque: 3,
        content: {
          explanation:
            'Los verbos reflexivos llevan siempre el pronombre reflexivo (me, te, se…). Son muy frecuentes en el vocabulario de rutinas diarias.',
          rule: 'El pronombre reflexivo va antes del verbo conjugado y concuerda con el sujeto: yo me lavo, tú te lavas, él se lava, nosotros nos lavamos…',
          examples: [
            { es: 'levantarse: me levanto, te levantas, se levanta…', ru: 'вставать: я встаю, ты встаёшь...' },
            { es: 'Me ducho a las 8.', ru: 'Я принимаю душ в 8' },
            { es: '¿Cómo te llamas?', ru: 'Как тебя зовут? (llamarse → звать + ся)' },
          ],
        },
      },
      {
        id: '3.5',
        title: 'Verbos con cambio vocálico',
        bloque: 3,
        content: {
          explanation:
            'Muchos verbos cambian la vocal de la raíz en las formas tónicas (yo, tú, él, ellos). Este cambio ocurre solo cuando el acento cae en la raíz.',
          rule: 'e → ie: querer, entender, empezar. o → ue: poder, volver, dormir. e → i: pedir, servir, seguir. NO cambia en nosotros/vosotros.',
          examples: [
            { es: 'querer: quiero / quieres / quiere / queremos / queréis / quieren', ru: 'хотеть: e→ie en formas tónicas' },
            { es: 'poder: puedo / puedes / puede / podemos / podéis / pueden', ru: 'мочь: o→ue en formas tónicas' },
            { es: 'pedir: pido / pides / pide / pedimos / pedís / piden', ru: 'просить: e→i en formas tónicas' },
          ],
        },
        exerciseLink: '/arcade',
      },
      {
        id: '3.6',
        title: 'Hay vs. Está / Están',
        bloque: 3,
        content: {
          explanation:
            'Otro error clásico del rusohablante. El ruso usa "есть" (или omite) para ambos conceptos. El español distingue existencia (hay) de ubicación de algo concreto (está/están).',
          rule: 'HAY: existencia impersonal ("existe"). No varía en número. ESTÁ/ESTÁN: ubicación de algo ya identificado.',
          examples: [
            { es: 'Hay un banco en esta calle.', ru: 'На этой улице есть банк (existencia, nuevo)' },
            { es: 'El banco está en la esquina.', ru: 'Банк находится на углу (ubicación, ya sabemos cuál)' },
            { es: '¿Hay leche? — Sí, está en la nevera.', ru: 'Есть молоко? — Да, оно в холодильнике.' },
          ],
          note: '"Hay" es SIEMPRE invariable: hay una persona, hay dos personas (no "están dos personas" para existencia). La confusión típica es decir "está un banco" cuando debería ser "hay un banco".',
        },
      },
    ],
  },
  {
    id: 4,
    title: 'El Verbo — Pasado',
    emoji: '⏪',
    lessons: [
      {
        id: '4.1',
        title: 'Pretérito Indefinido: verbos regulares',
        bloque: 4,
        content: {
          explanation:
            'El Pretérito Indefinido (también llamado Pretérito Simple) expresa acciones completadas en el pasado, con un tiempo definido o visto como concluido.',
          rule: '-AR: hablé, hablaste, habló, hablamos, hablasteis, hablaron. -ER/-IR: comí, comiste, comió, comimos, comisteis, comieron.',
          examples: [
            { es: 'Ayer hablé con mi madre.', ru: 'Вчера я поговорил с мамой (завершённое действие)' },
            { es: 'El año pasado viví en Madrid.', ru: 'В прошлом году я жил в Мадриде' },
            { es: '¿Comiste ya?', ru: 'Ты уже поел?' },
          ],
          note: 'El español tiene DOS pasados narrativos principales: Indefinido e Imperfecto. El ruso los distingue con el aspecto perfectivo/imperfectivo. En español la distinción es diferente — ver lección 4.4.',
        },
        exerciseLink: '/arcade',
      },
      {
        id: '4.2',
        title: 'Pretérito Indefinido: irregulares frecuentes',
        bloque: 4,
        content: {
          explanation:
            'Los verbos más usados tienen formas irregulares en el Indefinido. Los irregulares "fuertes" tienen acento en la raíz (no en la terminación) en yo y él.',
          rule: 'ser/ir: fui, fuiste, fue, fuimos, fuisteis, fueron. tener: tuve, tuviste, tuvo… hacer: hice, hiciste, hizo… poder: pude, pudiste, pudo… venir: vine, viniste, vino…',
          examples: [
            { es: 'Fui al médico ayer. (ir)', ru: 'Вчера я ходил к врачу' },
            { es: 'Hice los deberes. (hacer)', ru: 'Я сделал домашнее задание' },
            { es: 'Tuve un problema. (tener)', ru: 'У меня возникла проблема' },
          ],
          note: 'Ser e Ir tienen las MISMAS formas en Indefinido: "fui". Solo el contexto distingue "fui al cine" (ir) de "fui presidente" (ser).',
        },
        exerciseLink: '/arcade',
      },
      {
        id: '4.3',
        title: 'Pretérito Imperfecto: usos y conjugación',
        bloque: 4,
        content: {
          explanation:
            'El Imperfecto describe situaciones en el pasado: hábitos pasados, descripciones, acciones en curso cuando otra cosa ocurrió, y estados mentales o físicos en el pasado.',
          rule: '-AR: hablaba, hablabas, hablaba, hablábamos, hablabais, hablaban. -ER/-IR: comía, comías, comía, comíamos, comíais, comían. Solo 3 irregulares: ser (era), ir (iba), ver (veía).',
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
        bloque: 4,
        content: {
          explanation:
            'Esta distinción es difícil para rusohablantes porque el ruso la resuelve con el aspecto verbal (perfectivo vs imperfectivo), que es un mecanismo diferente aunque con cierto paralelismo.',
          rule: 'INDEFINIDO: acción concluida, puntual, que avanza la narración. IMPERFECTO: descripción del fondo, hábito, estado, acción en curso interrumpida.',
          examples: [
            { es: 'Vivía en Madrid cuando conocí a Ana.', ru: 'Жил (imperfecto) en Madrid cuando conocí (indefinido) — процесс прерван событием' },
            { es: 'De niño jugaba al fútbol todos los días.', ru: 'В детстве я каждый день играл в футбол (хабitual)' },
            { es: 'Ayer jugué al fútbol una hora.', ru: 'Вчера я поиграл в футбол час (один раз, завершено)' },
          ],
          note: 'Paralelismo aproximado con el ruso: Imperfecto ≈ aspecto imperfectivo (играл, жил). Indefinido ≈ aspecto perfectivo (сыграл, прожил). Pero NO es una equivalencia exacta — hay diferencias importantes.',
        },
        exerciseLink: '/practica',
      },
      {
        id: '4.5',
        title: 'Pretérito Perfecto: he comido',
        bloque: 4,
        content: {
          explanation:
            'El Pretérito Perfecto (he/has/ha + participio) se usa en España para acciones pasadas recientes o conectadas al presente. En Latinoamérica su uso varía mucho.',
          rule: 'Se forma con el presente de HABER + participio (-ado/-ido). El participio es invariable. Marcadores: hoy, esta semana, este mes, ya, todavía no, alguna vez.',
          examples: [
            { es: 'Hoy he comido paella.', ru: 'Сегодня я ел паэлью (hoy → Perfecto en España)' },
            { es: '¿Has estado en Madrid?', ru: 'Ты был в Мадриде? (experiencia de vida)' },
            { es: 'Todavía no he terminado.', ru: 'Я ещё не закончил (relevante para el presente)' },
          ],
          note: 'En Latinoamérica y en muchas partes de España informal, se usa el Indefinido en todos estos contextos: "Hoy comí paella". Para el DELE A2, aprende a reconocer ambos.',
        },
      },
    ],
  },
  {
    id: 5,
    title: 'El Verbo — Futuro y otros',
    emoji: '🔮',
    lessons: [
      {
        id: '5.1',
        title: 'Futuro inmediato: ir a + infinitivo',
        bloque: 5,
        content: {
          explanation:
            'La forma más común para hablar del futuro en español cotidiano es ir a + infinitivo. Es equivalente al inglés "going to" y al ruso собираться + инфинитив.',
          rule: 'PRESENTE de IR + a + INFINITIVO. Expresa planes, intenciones o predicciones basadas en evidencias presentes.',
          examples: [
            { es: 'Voy a estudiar esta tarde.', ru: 'Я собираюсь учиться сегодня вечером' },
            { es: '¿Qué vas a hacer el fin de semana?', ru: 'Что ты собираешься делать на выходных?' },
            { es: 'Va a llover — mira las nubes.', ru: 'Сейчас пойдёт дождь — смотри на тучи (evidencia)' },
          ],
        },
      },
      {
        id: '5.2',
        title: 'Futuro simple: conjugación y uso',
        bloque: 5,
        content: {
          explanation:
            'El Futuro Simple tiene sus propias terminaciones que se añaden directamente al infinitivo (para regulares). Se usa para predicciones más generales y promesas.',
          rule: 'Infinitivo + -é, -ás, -á, -emos, -éis, -án. Irregulares frecuentes: tener → tendr-, poder → podr-, hacer → har-, venir → vendr-, decir → dir-.',
          examples: [
            { es: 'Mañana hablaré con el director.', ru: 'Завтра я поговорю с директором' },
            { es: 'Tendrás noticias pronto.', ru: 'Скоро получишь новости' },
            { es: '¿Qué hora será? (probabilidad)', ru: 'Интересно, сколько сейчас времени? (предположение)' },
          ],
          note: 'El futuro simple también expresa probabilidad en el presente: "Tendrá unos 30 años" = Ему, наверное, около 30 лет.',
        },
      },
      {
        id: '5.3',
        title: 'El condicional básico',
        bloque: 5,
        content: {
          explanation:
            'El condicional expresa hipótesis, deseos corteses y la consecuencia de algo irreal. Es muy útil para "suavizar" peticiones (equivale al "бы" ruso).',
          rule: 'Infinitivo + -ía, -ías, -ía, -íamos, -íais, -ían. Mismas irregularidades que el futuro: tendr-ía, podr-ía, har-ía…',
          examples: [
            { es: '¿Podrías ayudarme? (petición cortés)', ru: 'Не мог бы ты помочь мне? (бы + глагол)' },
            { es: 'Me gustaría viajar a Japón.', ru: 'Мне хотелось бы поехать в Японию' },
            { es: 'Si tuviera dinero, viajaría. (hipótesis)', ru: 'Если бы у меня были деньги, я бы поехал' },
          ],
        },
      },
    ],
  },
  {
    id: 6,
    title: 'Estructura de la Oración',
    emoji: '🔧',
    lessons: [
      {
        id: '6.1',
        title: 'Orden de palabras: SVO',
        bloque: 6,
        content: {
          explanation:
            'El español tiene un orden básico Sujeto-Verbo-Objeto, pero es más flexible que el inglés. El ruso, gracias a los casos, permite casi cualquier orden. En español el orden transmite énfasis.',
          rule: 'Orden neutro: Sujeto + Verbo + Objeto. El orden puede variar para énfasis o en preguntas, pero el OVS o VSO marcado expresa énfasis, no es el orden por defecto.',
          examples: [
            { es: 'Ana come manzanas. (SVO neutro)', ru: 'Аня ест яблоки (нейтральный порядок)' },
            { es: 'Manzanas come Ana. (énfasis en objeto)', ru: 'Яблоки ест Аня (порядок слов выражает акцент)' },
            { es: '¿Qué come Ana? (pregunta, SVO)', ru: 'Что Аня ест? (порядок в вопросах)' },
          ],
          note: 'En ruso los casos permiten cambiar el orden libremente sin cambiar el significado básico. En español el orden cambiado SÍ añade énfasis o puede crear ambigüedad sin los casos.',
        },
      },
      {
        id: '6.2',
        title: 'La negación: no + verbo',
        bloque: 6,
        content: {
          explanation:
            'La negación básica en español es más simple que en ruso: solo se añade "no" antes del verbo. En ruso se usa "не" antes del verbo, que es similar.',
          rule: '"No" va siempre INMEDIATAMENTE antes del verbo (o del pronombre objeto si lo hay). La doble negación es gramaticalmente correcta en español.',
          examples: [
            { es: 'No hablo ruso.', ru: 'Я не говорю по-русски' },
            { es: 'No lo veo.', ru: 'Я его не вижу (no + pronombre + verbo)' },
            { es: 'No veo nada. / No veo ningún libro.', ru: 'Я ничего не вижу (doble negación: normal en español)' },
          ],
          note: 'La doble negación ("No veo nada", "No viene nadie") es CORRECTA en español — todo lo contrario que en inglés. En ruso también existe: "Я ничего не вижу".',
        },
      },
      {
        id: '6.3',
        title: 'Preguntas: entonación y partículas',
        bloque: 6,
        content: {
          explanation:
            'Las preguntas en español se forman subiendo la entonación al final (como en ruso) o usando pronombres interrogativos. En español escrito, las preguntas se marcan con ¿ al inicio.',
          rule: 'Pronombres interrogativos: qué, quién/quiénes, cuál/cuáles, cómo, dónde, cuándo, cuánto/a/os/as, por qué. TODOS llevan tilde cuando son interrogativos.',
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
        bloque: 6,
        content: {
          explanation:
            'Las preposiciones en español hacen el trabajo que los casos hacen en ruso. No hay una equivalencia 1:1 — cada preposición española tiene varios usos.',
          rule: 'Las principales: a (dirección, OD personas, hora), de (posesión, origen, material), en (lugar, tiempo), con (compañía, instrumento), por (causa, a favor, duración), para (finalidad, destinatario).',
          examples: [
            { es: 'Voy a Madrid. / Llego a las 3.', ru: 'Еду в Мадрид. / Приеду в 3 часа.' },
            { es: 'Es el libro de Ana. / Soy de Rusia.', ru: 'Это книга Ани. / Я из России.' },
            { es: 'Trabajo con mi hermano.', ru: 'Я работаю с братом (творительный падеж → con)' },
          ],
          note: 'El ruso usa el caso instrumental donde el español usa "con". El genitivo ruso corresponde a "de". El dativo a "a". Pero estas equivalencias tienen excepciones — no traduzcas mecánicamente.',
        },
      },
      {
        id: '6.5',
        title: 'Por vs. Para',
        bloque: 6,
        content: {
          explanation:
            'La distinción por/para es difícil para todos los estudiantes de español. Ambas se traducen al ruso como "за", "для", "по", "через", "из-за"… según el contexto.',
          rule: 'POR: causa/motivo, duración, medio, intercambio, a favor de, por donde. PARA: finalidad/objetivo, destinatario, opinión, fecha límite, contraste.',
          examples: [
            { es: 'Lo hago por ti. (causa/a favor)', ru: 'Я делаю это из-за тебя / ради тебя' },
            { es: 'Lo hago para ti. (destinatario)', ru: 'Я делаю это для тебя' },
            { es: 'Estudio por las noches. (tiempo) / El regalo es para el lunes. (fecha)', ru: 'Учусь по ночам / Подарок к понедельнику' },
          ],
          note: 'Un truco: PARA señala hacia adelante (objetivo, futuro, destinatario). POR mira hacia atrás o al entorno (causa, motivo, a cambio de).',
        },
        exerciseLink: '/practica',
      },
    ],
  },
  {
    id: 7,
    title: 'El Adjetivo',
    emoji: '🎨',
    lessons: [
      {
        id: '7.1',
        title: 'Concordancia de género y número',
        bloque: 7,
        content: {
          explanation:
            'En español, el adjetivo concuerda en género (m/f) y número (sg/pl) con el sustantivo que modifica. En ruso también hay concordancia, pero con 3 géneros y 6 casos.',
          rule: 'Adjetivos en -o: cambian -o → -a para femenino. Adjetivos en -e o consonante: misma forma para m/f (solo cambia el plural). Plural: -os/-as según género.',
          examples: [
            { es: 'un chico alto / una chica alta', ru: 'высокий парень / высокая девушка (согласование)' },
            { es: 'un hombre inteligente / una mujer inteligente', ru: 'умный мужчина / умная женщина (misma forma)' },
            { es: 'libros interesantes / revistas interesantes', ru: 'интересные книги (plural en -es)' },
          ],
          note: 'Para el rusohablante la concordancia en género/número es familiar, aunque en ruso hay 3 géneros y los adjetivos también varían por caso. En español es más simple: solo género y número, sin casos.',
        },
      },
      {
        id: '7.2',
        title: 'Posición del adjetivo',
        bloque: 7,
        content: {
          explanation:
            'En español el adjetivo puede ir antes o después del sustantivo, y la posición puede cambiar el significado. En ruso suele ir antes del sustantivo.',
          rule: 'DESPUÉS del sustantivo: adjetivos descriptivos (clasifican, distinguen). ANTES: adjetivos de valoración subjetiva o con significado ya conocido. Algunos adjetivos cambian de significado según posición.',
          examples: [
            { es: 'un coche rojo (descripción objetiva)', ru: 'красная машина (описание)' },
            { es: 'un gran hombre (valoración: "gran" = importante)', ru: 'великий человек (перед сущ. = "великий")' },
            { es: 'un hombre grande (descripción: tamaño)', ru: 'большой человек (después = descripción física)' },
          ],
        },
      },
      {
        id: '7.3',
        title: 'Comparativos',
        bloque: 7,
        content: {
          explanation:
            'El español usa una estructura analítica (más/menos + adjetivo + que) para los comparativos. En ruso existen formas sintéticas (-ee, -ше) y analíticas (более/менее).',
          rule: 'Superioridad: más + adj + que. Inferioridad: menos + adj + que. Igualdad: tan + adj + como. Irregulares: bueno → mejor, malo → peor, grande → mayor, pequeño → menor.',
          examples: [
            { es: 'Madrid es más grande que Sevilla.', ru: 'Мадрид больше Севильи (más grande = больше)' },
            { es: 'Este libro es tan interesante como ese.', ru: 'Эта книга так же интересна, как та' },
            { es: 'Este hotel es mejor que aquel.', ru: 'Этот отель лучше того (mejor = лучше, irregular)' },
          ],
        },
      },
      {
        id: '7.4',
        title: 'Superlativos',
        bloque: 7,
        content: {
          explanation:
            'El superlativo expresa el grado máximo. El español tiene dos formas: relativa (el más…) y absoluta (-ísimo). En ruso: самый + adjetivo o forma en -айший/-ейший.',
          rule: 'Superlativo relativo: el/la/los/las + más/menos + adjetivo (+ de). Superlativo absoluto: adjetivo + -ísimo/a (quita la última vocal si la hay).',
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
    emoji: '📚',
    lessons: [
      {
        id: '8.1',
        title: 'Presentaciones y datos personales',
        bloque: 8,
        content: {
          explanation: 'Vocabulario esencial para hablar de uno mismo: nombre, origen, edad, estado civil, estudios y trabajo.',
          rule: 'Frases clave: Me llamo… / Soy de… / Tengo X años / Vivo en… / Trabajo de… / Estudio…',
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
        bloque: 8,
        content: {
          explanation: 'Vocabulario de parentesco y relaciones personales.',
          rule: 'madre, padre, hermano/a, hijo/a, abuelo/a, tío/a, primo/a, marido/esposo, mujer/esposa, novio/a, amigo/a.',
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
        bloque: 8,
        content: {
          explanation: 'Vocabulario del hogar para describir dónde vives y qué hay en tu casa.',
          rule: 'Habitaciones: salón, cocina, dormitorio, baño, terraza. Objetos: sofá, mesa, silla, cama, armario, nevera, lavadora, espejo.',
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
        bloque: 8,
        content: {
          explanation: 'Verbos y expresiones para hablar de lo que haces cada día y en tu tiempo libre.',
          rule: 'levantarse, desayunar, trabajar, comer, cenar, acostarse. Ocio: ver la tele, leer, salir, hacer deporte, quedar con amigos.',
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
        bloque: 8,
        content: {
          explanation: 'Vocabulario para pedir en un restaurante, hablar de gustos gastronómicos y comprender menús.',
          rule: 'Quería / Quisiera + plato. Me pone / Me trae… ¿Qué tiene de…? La cuenta, por favor. Primero, segundo, postre.',
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
        bloque: 8,
        content: {
          explanation: 'Vocabulario para comprar ropa, preguntar precios y tallas.',
          rule: '¿Cuánto cuesta/n? ¿Tiene en talla…? Me lo/la llevo. ¿Puedo probármelo/la? Está en oferta / rebajado.',
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
        bloque: 8,
        content: {
          explanation: 'Vocabulario para moverse por la ciudad, preguntar direcciones y usar el transporte público.',
          rule: 'gire a la derecha/izquierda, todo recto, coger el metro/autobús/tren, la parada, el andén, billete/ticket, ¿Cómo se va a…?',
          examples: [
            { es: '¿Cómo se va a la estación de metro?', ru: 'Как пройти к станции метро?' },
            { es: 'Gire a la izquierda y todo recto.', ru: 'Поверните налево и прямо.' },
            { es: 'Dos billetes para Madrid, por favor.', ru: 'Два билета до Мадрида, пожалуйста.' },
          ],
        },
      },
      {
        id: '8.8',
        title: 'Trabajo y estudios',
        bloque: 8,
        content: {
          explanation: 'Vocabulario para hablar de la vida profesional y académica.',
          rule: 'trabajar de/como, estar en paro, buscar trabajo, el sueldo, el horario, estudiar, la carrera, el título, aprobar/suspender.',
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
        bloque: 8,
        content: {
          explanation: 'Vocabulario para hablar de enfermedades, síntomas y visitas al médico.',
          rule: 'Me duele/n + parte del cuerpo. Tener fiebre, tos, catarro. Ir al médico, la farmacia, la receta, el medicamento.',
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
        bloque: 8,
        content: {
          explanation: 'Vocabulario para hablar del tiempo y las condiciones atmosféricas.',
          rule: 'Hacer + frío/calor/viento/sol. Estar + nublado/despejado. Llover (llueve), nevar (nieva), la temperatura.',
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
        bloque: 8,
        content: {
          explanation: 'Los números, las fechas y la hora son fundamentales en cualquier interacción básica.',
          rule: 'La hora: Es la una. Son las dos/tres… Son las X y media / y cuarto / menos cuarto. Fechas: el + número + de + mes. Años: dos mil veinticinco.',
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
    emoji: '💬',
    lessons: [
      {
        id: '9.1',
        title: 'Pedir y dar información',
        bloque: 9,
        content: {
          explanation: 'Fórmulas para solicitar y proporcionar información en contextos cotidianos.',
          rule: 'Perdona/Perdone, ¿puede decirme…? ¿Sabe si…? ¿Me puede ayudar? Disculpe, ¿dónde está…?',
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
        bloque: 9,
        content: {
          explanation: 'Cómo invitar a alguien, aceptar y declinar educadamente.',
          rule: '¿Te apetece/Te gustaría + infinitivo? / ¿Quieres venir a…? Aceptar: ¡Claro que sí! / ¡Con mucho gusto! Rechazar: Lo siento, es que… / Me encantaría pero…',
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
        bloque: 9,
        content: {
          explanation:
            'La estructura gustar + verbo/sustantivo es peculiar: el sujeto gramatical es lo que gusta, no la persona. Es un error muy común del rusohablante.',
          rule: 'Me gusta + sustantivo singular / infinitivo. Me gustan + sustantivo plural. Me encanta (mucho), me gusta (bastante), no me gusta (poco), no me gusta nada (nada).',
          examples: [
            { es: 'Me gusta el fútbol. / Me gustan los gatos.', ru: 'Мне нравится футбол. / Мне нравятся кошки.' },
            { es: 'Me encanta cocinar.', ru: 'Я обожаю готовить.' },
            { es: 'A mi hermano le gusta la música clásica.', ru: 'Моему брату нравится классическая музыка.' },
          ],
          note: '"Me gusta" no es una estructura reflexiva. El pronombre "me" es de dativo ("a mí me gusta"). En ruso: "Мне нравится" — mismo caso dativo. El sujeto es "el fútbol", no "yo".',
        },
        exerciseLink: '/practica',
      },
      {
        id: '9.4',
        title: 'Hablar de planes y proyectos',
        bloque: 9,
        content: {
          explanation: 'Cómo hablar de intenciones, planes futuros y proyectos.',
          rule: 'Ir a + infinitivo (plan concreto). Querer/pensar/tener intención de + infinitivo (intención). Esperar + infinitivo (esperanza).',
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
        bloque: 9,
        content: {
          explanation: 'Vocabulario y estructuras para hacer descripciones detalladas.',
          rule: 'SER + adjetivo (características permanentes). ESTAR + adjetivo (estados). TENER + sustantivo (posesión de características). PARECER + adjetivo (apariencia).',
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
        bloque: 9,
        content: {
          explanation: 'Cómo contar una historia o anécdota combinando el Indefinido (acciones puntuales) y el Imperfecto (descripción del contexto).',
          rule: 'Conectores narrativos: primero, luego, después, entonces, de repente, al final. Imperfecto para el fondo; Indefinido para los eventos.',
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
        bloque: 9,
        content: {
          explanation: 'Fórmulas para dar tu opinión, estar de acuerdo y expresar duda.',
          rule: 'Creo que… / Pienso que… / Para mí… / En mi opinión… / Me parece que… + indicativo. Estar de acuerdo: Tienes razón. No estar de acuerdo: No estoy de acuerdo porque…',
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
        bloque: 9,
        content: {
          explanation: 'Fórmulas de cortesía para transacciones cotidianas.',
          rule: 'Quería / Quisiera / Me pone (barra) / Póngame (barra) + lo que quieres. ¿Me cobra? ¿Cuánto es? ¿Me da un recibo?',
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
    emoji: '⚠️',
    lessons: [
      {
        id: '10.1',
        title: 'Olvidar los artículos',
        bloque: 10,
        content: {
          explanation:
            'El error más frecuente y más fácil de cometer: omitir el artículo porque en ruso no existe esta categoría gramatical.',
          rule: 'Siempre hay que decidir: ¿artículo determinado (el/la), indeterminado (un/una) o sin artículo? No existe la opción de "simplemente no poner nada" por defecto.',
          examples: [
            { es: '✗ Tengo perro. ✓ Tengo un perro.', ru: 'У меня есть собака → un perro (primera mención)' },
            { es: '✗ Voy a mercado. ✓ Voy al mercado.', ru: 'Иду на рынок → al mercado (conocido)' },
            { es: '✗ Me gusta música. ✓ Me gusta la música.', ru: 'Мне нравится музыка → la música (categoría general)' },
          ],
          note: 'Truco: si en inglés usarías "the", en español probablemente sea "el/la". Si usarías "a/an", es "un/una". Si no usarías ninguno (profesiones, nacionalidades), tampoco en español.',
        },
      },
      {
        id: '10.2',
        title: 'Confundir ser y estar',
        bloque: 10,
        content: {
          explanation:
            'Usar ser donde va estar y viceversa es uno de los errores más notorios. El rusohablante tiende a omitir el verbo o a usar siempre "ser" por ser más "permanente".',
          rule: 'ESTAR para estados, ubicación, resultados. SER para identidad, características inherentes, hora, eventos, material.',
          examples: [
            { es: '✗ Soy cansado. ✓ Estoy cansado.', ru: 'Я устал — estado temporal → ESTAR' },
            { es: '✗ Estoy médico. ✓ Soy médico.', ru: 'Я врач — profesión → SER' },
            { es: '✗ El museo es en el centro. ✓ El museo está en el centro.', ru: 'Музей в центре — ubicación → ESTAR' },
          ],
        },
        exerciseLink: '/practica',
      },
      {
        id: '10.3',
        title: 'Concordancia de género en adjetivos',
        bloque: 10,
        content: {
          explanation:
            'En ruso los adjetivos también concuerdan, pero como en español no hay casos que cambien la forma, el ruso-hablante a veces olvida al menos la concordancia de género.',
          rule: 'El adjetivo SIEMPRE concuerda en género y número con el sustantivo. No existe el adjetivo "neutro" o invariable para sustantivos comunes.',
          examples: [
            { es: '✗ Mi hermana es alto. ✓ Mi hermana es alta.', ru: 'Моя сестра высокая — femenino → alta' },
            { es: '✗ Unos personas interesante. ✓ Unas personas interesantes.', ru: 'Несколько интересных людей — plural → interesantes' },
            { es: '✗ El problema es serio y importante. ✓ (correcto, "problema" es masculino)', ru: '"Problema" es masculino en español (excepción)' },
          ],
        },
      },
      {
        id: '10.4',
        title: 'Uso incorrecto de hay/está/están',
        bloque: 10,
        content: {
          explanation:
            'La confusión entre "hay" (existencia) y "está/están" (ubicación de algo concreto) es muy común para rusohablantes que usan "есть" o simplemente omiten el verbo.',
          rule: 'HAY = existe (новый объект в разговоре). ESTÁ/ESTÁN = se encuentra/n (объект уже известен). Hay no cambia en plural: hay una, hay dos.',
          examples: [
            { es: '✗ Está un supermercado aquí. ✓ Hay un supermercado aquí.', ru: 'Тут есть супермаркет (existencia) → HAY' },
            { es: '✗ Hay el supermercado en la calle Mayor. ✓ El supermercado está en la calle Mayor.', ru: 'Супермаркет находится на улице Майор (ubicación) → ESTÁ' },
            { es: '✗ Están mucha gente. ✓ Hay mucha gente.', ru: 'Много людей (existencia impersonal) → HAY' },
          ],
        },
      },
      {
        id: '10.5',
        title: 'Traducir literalmente desde el ruso (calcos)',
        bloque: 10,
        content: {
          explanation:
            'Los calcos son traducciones literales que suenan incorrectas. El ruso y el español estructuran algunas expresiones de forma muy diferente.',
          rule: 'No traduzcas palabra por palabra. Aprende las expresiones como bloques fijos.',
          examples: [
            { es: '✗ Tengo X años de edad. ✓ Tengo X años. (edad)', ru: 'Мне X лет — "tener + años", no "ser + años"' },
            { es: '✗ Estoy de acuerdo con eso que dices. ✓ Estoy de acuerdo contigo.', ru: 'Я согласен с тобой — contigo, no "con eso que dices"' },
            { es: '✗ Me es difícil. ✓ Me resulta difícil. / Es difícil para mí.', ru: 'Мне трудно — no calco literal' },
          ],
        },
      },
      {
        id: '10.6',
        title: 'Falsos amigos ruso-español',
        bloque: 10,
        content: {
          explanation:
            'Palabras que se parecen en ruso y español pero tienen significados distintos. Pueden causar malentendidos graves.',
          rule: 'Presta atención especial a palabras de origen latino o griego que existen en ambas lenguas pero con significados divergentes.',
          examples: [
            { es: 'embarazada ≠ смущённая (avergonzada)', ru: '"Embarazada" = беременная, NO смущённая' },
            { es: 'constipado ≠ запор', ru: '"Estar constipado" = estar resfriado (насморк, gripe)' },
            { es: 'actual ≠ настоящий/реальный', ru: '"Actual" en español = actual/current (нынешний), no "real"' },
          ],
          note: '"Estoy embarazada" en español significa "estoy embarazada" (беременна), NO "estoy avergonzada". Este error es famoso y puede crear situaciones muy incómodas.',
        },
      },
      {
        id: '10.7',
        title: 'Omitir preposiciones o copiarlas del ruso',
        bloque: 10,
        content: {
          explanation:
            'El ruso expresa las relaciones gramaticales con casos. El español lo hace con preposiciones. No siempre hay correspondencia directa.',
          rule: 'No omitas la preposición "a" con objeto directo de persona. No uses "en" donde va "a" para destinos. Aprende las preposiciones de cada verbo.',
          examples: [
            { es: '✗ Veo María. ✓ Veo a María. (a personal)', ru: 'Я вижу Марию — el "a" personal no existe en ruso' },
            { es: '✗ Voy en Madrid. ✓ Voy a Madrid.', ru: 'Еду в Мадрид — "в" ruso ≠ "en" español para destinos' },
            { es: '✗ Pienso en ir. ✓ Pienso ir. / Pienso en hacerlo.', ru: 'Думаю поехать — pensar + inf (sin en) vs pensar en + inf (considerar)' },
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
