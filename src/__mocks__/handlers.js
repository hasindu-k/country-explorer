import { rest } from "msw";

export const handlers = [
  rest.get(
    "https://restcountries.com/v3.1/all?fields=name,capital,region,population,languages,flags,cca3",
    (req, res, ctx) => {
      console.log("🧪 MSW Intercepted API");
      return res(
        ctx.json([
          {
            flags: {
              png: "https://flagcdn.com/w320/bw.png",
              svg: "https://flagcdn.com/bw.svg",
              alt: "The flag of Botswana has a light blue field with a white-edged black horizontal band across its center.",
            },
            name: {
              common: "Botswana",
              official: "Republic of Botswana",
              nativeName: {
                eng: { official: "Republic of Botswana", common: "Botswana" },
                tsn: { official: "Lefatshe la Botswana", common: "Botswana" },
              },
            },
            cca3: "BWA",
            capital: ["Gaborone"],
            region: "Africa",
            languages: {
              eng: "English",
              tsn: "Tswana",
            },
            population: 2351625,
          },
        ])
      );
    }
  ),
];
