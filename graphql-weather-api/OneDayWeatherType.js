import { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLID, GraphQLFloat } from 'graphql';
import {
  toFarenheit,
  toCelsius,
} from './helper'

const oneDayWeatherType = new GraphQLObjectType({
  name: "OneDayWeather",
  fields: () => ({
    coord: {type: OneDayCoordinatesType },
    weather: { type: new GraphQLList(OneDayWeatherListType) },
    base: { type: GraphQLString },
    main: { type: OneDayMainType },
    visibility: { type: GraphQLFloat },
    wind: { type: OneDayWindType },
    clouds: { type: OneDayCloudsType },
    dt: { type: GraphQLInt },
    sys: { type: OneDaySysType },
    timezone: { type: GraphQLFloat },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    cod: { type: GraphQLString },
  })
});

const OneDaySysType = new GraphQLObjectType({
  name: "OneDaySys",
  fields: () => ({
    id: { type: GraphQLID },
    country: { type: GraphQLString },
    type: { type: GraphQLInt },
  })
});

const OneDayCoordinatesType = new GraphQLObjectType({
  name: "OneDayCoordinates",
  fields: () => ({
    lon: { type: GraphQLFloat },
    lat: { type: GraphQLFloat},
  }),
});

const OneDayMainType = new GraphQLObjectType({
  name: "OneDayMain",
  fields: () => ({
    temp: { type: GraphQLFloat },
    feels_like: { type: GraphQLFloat},
    temp_min: { type: GraphQLFloat },
    temp_max: { type: GraphQLFloat },
    temp_f: {
      type: GraphQLFloat,
      resolve: obj => toFarenheit(obj.temp)
    },
    temp_c: {
      type: GraphQLFloat,
      resolve: obj => toCelsius(obj.temp)
    },
    pressure: { type: GraphQLFloat },
    humidity: { type: GraphQLInt },
  }),
});

const OneDayWeatherListType = new GraphQLObjectType({
  name: "OneDayWeatherList",
  fields: () => ({
    id: { type: GraphQLID },
    main: { type: GraphQLString},
    description: { type: GraphQLString},
    icon: { type: GraphQLString},
  }),
});

const OneDayWindType = new GraphQLObjectType({
  name: "OneDayWind",
  fields: () => ({
    speed: { type: GraphQLFloat },
    deg: { type: GraphQLFloat },
  }),
});

const OneDayCloudsType = new GraphQLObjectType({
  name: "OneDayClouds",
  fields: () => ({
    all: { type: GraphQLInt },
  }),
});

export default oneDayWeatherType;