import {
  IconBrandDiscord,
  IconBrandGithub,
  IconChevronDown,
} from "@tabler/icons";
import Link from "next/link";
import Divider from "../components/Divider";
import Paragraph from "../components/Paragraph";
import Section from "../components/Section";
const supportedBadges: {
  relativePathExample: string;
  exampleSrc: string;
  name: string;
  description?: string;
}[] = [
  {
    name: "نشان معمولی",
    relativePathExample: "/api/discord/<LABEL>-<MESSAGE>-<COLOR>",
    exampleSrc: "/api/badge/تلگرام-عضو شوید-0088CC?logo=telegram",
  },
  {
    name: "تعداد اعضای سرور دیسکورد",
    relativePathExample: "/api/discord/<Guild ID>",
    exampleSrc: "/api/discord/508357248330760243",
  },
  {
    name: "پایانه JSON",
    description:
      "با استفاده از این قابلیت، امکان این را دارید که پایانه های خود را به نشان تبدیل کنید.",
    relativePathExample: "/api/endpoint?url=<ENDPOINT>",
    exampleSrc:
      "/api/endpoint?url=https://rickandmortyapi.com/api/character/1&labelKey=name&labelStatus=status&color=green",
  },
  {
    name: "تعداد مشارکت کنندگان گیت هاب",
    relativePathExample: "/api/github/contributors/<User>/<Repository>",
    exampleSrc: "/api/github/contributors/matnbaz/matnbaz",
  },
  {
    name: "لیسانس در گیت هاب",
    relativePathExample: "/api/github/license/<User>/<Repository>",
    exampleSrc: "/api/github/license/nodejs/node",
  },
  {
    name: "تعداد ستاره ها در گیت هاب",
    relativePathExample: "/api/github/stars/<User>/<Repository>",
    exampleSrc: "/api/github/stars/matnbaz/matnbaz",
  },
  {
    name: "دانلود های NPM در مدت زمان های مشخص",
    relativePathExample: "/api/npm/<Interval>/<Package>",
    exampleSrc: "/api/npm/last-week/persian-helpers",
  },
  {
    name: "آخرین نسخه در NPM",
    relativePathExample: "/api/npm/v/<Package>",
    exampleSrc: "/api/npm/v/persian-helpers",
  },
  {
    name: "دانلود های Nuget",
    relativePathExample: "/api/nuget/dt/<Package>",
    exampleSrc: "/api/nuget/dt/Persian",
  },
  {
    name: "آخرین نسخه در Nuget",
    relativePathExample: "/api/nuget/v/<Package>",
    exampleSrc: "/api/nuget/v/Persian",
  },
];

const styles: { name: string; style: string }[] = [
  { name: "پلاستیک", style: "plastic" },
  { name: "تخت", style: "flat" },
  { name: "تخت مستطیلی", style: "flat-square" },
  { name: "شبکه اجتماعی", style: "social" },
];

const parameters: { description: string; example: string }[] = [
  {
    example: "?label=سلام دنیا",
    description: "دستی، نوشته سمت راست نشان را تنظیم کنید.",
  },
  {
    example: "?status=سلام دنیا",
    description: "دستی، نوشته سمت چپ نشان را تنظیم کنید.",
  },
  {
    example: "?logo=nodedotjs",
    description: `دستی، لوگوی نشان را تنظیم کنید. این لوگو می بایست آیکونی معتبر در <a href="https://simpleicons.org/" target="_blank" referrerPolicy="no-referrer">simple-icons</a> باشد.`,
  },
  {
    example: "?logoColor=red",
    description:
      "دستی، رنگ آیکون لوگو را تنظیم کنید. به صورت پیش فرض، با رنگ برند لوگوی مورد نظر یکسان است.",
  },
  {
    example: "?labelColor=blue",
    description: "دستی، رنگ نوشته سمت راست نشان را عوض کنید.",
  },
  {
    example: "?color=green",
    description: "دستی، رنگ قسمت سمت چپی نشان را عوض کنید.",
  },
];

export default function Home() {
  return (
    <>
      <div className="min-h-screen w-full bg-[#0a0112] overflow-hidden text-white relative flex flex-col lg:flex-row items-center justify-center space-y-12 lg:space-y-0 lg:justify-between px-8 lg:px-24">
        <div className="flex items-center justify-between absolute top-0 right-0 w-full h-full px-12 lg:px-32">
          {[...new Array(6)].map((index) => (
            <div key={index} className="w-0.5 h-full bg-gray-900/20"></div>
          ))}
          {[...new Array(6)].map((index) => (
            <div
              key={index}
              className="w-0.5 h-full bg-gray-900/20 hidden lg:block"
            ></div>
          ))}
        </div>
        <div className="bg-purple-500 opacity-50 w-96 h-96 absolute right-4 bottom-8 rounded-full blur-[250px]"></div>
        <div className="bg-red-500 opacity-50 w-96 h-96 absolute left-4 top-24 rounded-full blur-[250px]"></div>
        <div className="flex flex-col space-y-8 max-w-full lg:max-w-3xl relative z-10 text-center lg:text-start">
          <h1 className="text-4xl lg:text-[60px] font-extrabold leading-relaxed">
            به فارسی <span className="text-purple-500">نشان</span> داشته باشید.
          </h1>
          <h2 className="text-lg lg:text-3xl font-extralight text-gray-400">
            پروژه های خود را با نشان های فارسی، زیبا تر کنید.
          </h2>
        </div>

        <div className="relative w-96 h-96 z-10">
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <img
              src="/api/badge/%D8%AA%D9%84%DA%AF%D8%B1%D8%A7%D9%85-%D8%B9%D8%B6%D9%88%20%D8%B4%D9%88%DB%8C%D8%AF-0088CC?logo=telegram"
              className="h-8"
            />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <img
              src="/api/badge/لیسانس-MIT-97ca00?logo=mit&style=plastic"
              className="h-8 -translate-x-[85px] -translate-y-12"
            />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <img
              src="/api/github/stars/matnbaz/matnbaz?style=flat-square"
              className="h-8 translate-x-16 -translate-y-16"
            />
          </div>
        </div>
      </div>
      <div className="pt-12 lg:pt-24 max-w-3xl mx-auto px-8 lg:px-0">
        <div className="grid md:grid-cols-2 gap-8 grid-cols-1">
          <h1 className="text-center text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-600">
            مشکل
          </h1>
          <p className="text-2xl leading-relaxed text-gray-700 font-light">
            در حال حاضر، ارائه دهندگان Badge همانند shields.io، قادر نیستند از
            زبان فارسی پشتیبانی کنند و لذا کاربرانی که پروژه های فارسی زبان
            ساخته اند، ناچارا از نشان های انگلیسی استفاده می کنند.
          </p>
        </div>

        <div className="pt-20 grid md:grid-cols-2 gap-8 grid-cols-1">
          <p className="text-2xl leading-relaxed text-gray-700 font-light">
            پرشین بدج، این هدف را دارد که با ارائه Badge یا نشان های فارسی،
            بتواند به جامعه متن‌باز ایران کمک کند.
          </p>
          <h1 className="text-center text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-600">
            راه حل
          </h1>
        </div>
      </div>
      <Divider className="mt-12 lg:mt-24 mb-10 lg:mb-16" />
      <div className="flex flex-col max-w-3xl space-y-8 items-center justify-center mx-auto px-8 lg:px-0">
        <h1 className="text-2xl lg:text-4xl font-bold tracking-tight">
          سازگار با shields.io
        </h1>
        <Paragraph>
          اگر در حال حاضر از shields.io استفاده می کنید، کوچ کردن به پرشین بدج
          بسیار ساده می باشد چرا که پرشین بدج با shields.io، تماما سازگار است.
          برخی از نشان ها برای سرعت بالاتر، توسط پرشین بدج پیاده سازی شده اند
          اما باقی نشان ها، مستقیم از shields.io استفاده می کنند و به همین
          ترتیب، پرشین بدج با shields.io سازگاری کامل دارد.
        </Paragraph>
        <div
          className="px-8 py-4 rounded-lg bg-gray-100 flex flex-col space-y-4 items-center w-full justify-center"
          dir="ltr"
        >
          <h1 className="text-black">https://img.shields.io/...</h1>

          <IconChevronDown className="w-8 h-8 text-gray-500" />

          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-purple-700">
            https://persian-badge.ir/api/...
          </h1>
          {/* <div className="py-4 w-full">
            <Divider />
          </div>
          <button
            className="rounded-full border border-blue-600 text-blue-6 00 px-4 py-2"
            dir="rtl"
          >
            تبدیل کننده README به پرشین بدج
          </button> */}
        </div>
        <h1 className="text-2xl font-semibold">سبک ها</h1>
        {styles.map((style) => (
          <div
            key={style.name}
            className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-4"
          >
            <p className="p-2 bg-blue-100 text-blue-500 rounded-lg" dir="ltr">
              ?style={style.style}
            </p>
            <img
              className="h-8"
              src={`/api/badge/سبک-${style.name}-yellowgreen?style=${style.style}&logo=nextdotjs&logoColor=white`}
            />
          </div>
        ))}
        <h1 className="text-2xl font-semibold">پارامتر ها</h1>
        {parameters.map((parameter) => (
          <div
            key={parameter.example}
            className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-4"
          >
            <p
              className="p-2 bg-blue-100 text-blue-500 rounded-lg shrink-0"
              dir="ltr"
            >
              {parameter.example}
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: parameter.description }}
              className="text-lg text-gray-500 font-light max-w-full w-full lg:max-w-md"
            ></p>
          </div>
        ))}
      </div>
      <Divider className="mt-12 lg:mt-24 mb-10 lg:mb-16" />
      <Section>
        <h1 className="text-2xl lg:text-4xl tracking-tight font-bold">
          نشان های دوباره پیاده سازی شده
        </h1>
        {supportedBadges.map((badge) => {
          return (
            <div
              key={badge.name}
              className="px-6 py-4 border border-gray-300 rounded-lg overflow-x-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between space-y-4 lg:space-y-0 w-full"
            >
              <div className="flex flex-col items-start space-y-4 w-full lg:w-auto">
                <h1 className="text-xl font-semibold">{badge.name}</h1>
                {badge.description && (
                  <p className="text-lg text-gray-500 font-light max-w-xs">
                    {badge.description}
                  </p>
                )}
                <h2 className="text-lg font-light text-gray-500">
                  نوع استفاده:{" "}
                  <Link href={badge.exampleSrc} passHref>
                    <a className="text-blue-400" dir="ltr">
                      {badge.relativePathExample}
                    </a>
                  </Link>
                </h2>
              </div>
              <img className="h-8" src={badge.exampleSrc} />
            </div>
          );
        })}
        <h1 className="text xl text-gray-500">
          ... و دیگر نشان های shields.io
        </h1>
      </Section>
      <Divider className="mt-12 lg:mt-24 mb-10 lg:mb-16" />
      <Section>
        <h1 className="text-2xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 to-purple-700 tracking-tight">
          نشان مورد نظر را پیدا نمی کنید؟
        </h1>
        <Paragraph>
          ما تلاشمان بر این است که از تمام نشان های shields.io به درستی پشتیبانی
          کنیم و در آینده، نشان های مربوط به وبسایت های فارسی را هم اضافه کنیم.
          اما گاهی ممکن است بعضی نشان ها به درستی ترجمه نشوند یا دارای ایرادی
          باشند.{" "}
          <Link
            href="https://github.com"
            passHref
            target="_blank"
            referrerPolicy="no-referrer"
          >
            <a className="text-blue-500">
              در این صورت، حتما یک Issue جدید ایجاد کنید تا ما در اسرع وقت
              پاسخگوی شما باشیم.
            </a>
          </Link>
        </Paragraph>
      </Section>
      <Divider className="mt-12 lg:mt-24 mb-10 lg:mb-16" />
      <Section>
        <h1 className="text-2xl lg:text-4xl font-bold">حمایت مالی</h1>
        <Paragraph>
          پرشین بدج، هدف بر ری برند کردن و خرید دامنه جدا و هاست جداگانه است اما
          برای انجام این امر، نیاز به کمک مالی شما دارد. بنابراین با کلیک کردن
          بر روی لینک زیر، به ما در انجام این امر کمک کنید.
        </Paragraph>
        <Link
          href="https://www.coffeebede.com/kasragh"
          target={"_blank"}
          referrerPolicy="no-referrer"
        >
          <a className="px-4 py-2 rounded-full border border-green-500 text-green-500 text-lg">
            حمایت مالی
          </a>
        </Link>
      </Section>
      <div className="py-8 px-12 mt-24 w-full bg-gray-100 flex items-center justify-between">
        <h1 className="text-2xl font-bold">پرشین بدج</h1>
        <div className="flex items-center space-x-4 space-x-reverse">
          <IconBrandGithub className="p-2 w-10 h-10 rounded-full text-gray-400 border border-gray-400" />
          <IconBrandDiscord className="p-2 w-10 h-10 rounded-full text-gray-400 border border-gray-400" />
        </div>
      </div>
    </>
  );
}
