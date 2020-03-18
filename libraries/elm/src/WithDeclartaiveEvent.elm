module WithDeclartaiveEvent exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes
import Html.Events
import Json.Decode

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , update = update
        , view = view
        }


type alias Model =
    { lowercaseHandled : Bool
    , kebabHandled : Bool
    , camelHandled : Bool
    , capsHandled : Bool
    , pascalHandled : Bool
    }


type Msg = EventFired (Model -> Model)


init : () -> ( Model, Cmd Msg )
init _ =
    ( { lowercaseHandled = False
      , kebabHandled = False
      , camelHandled = False
      , capsHandled = False
      , pascalHandled = False
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        EventFired apply ->
            ( apply model, Cmd.none )


view : Model -> Html Msg
view { lowercaseHandled, kebabHandled, camelHandled, capsHandled, pascalHandled } =
    Html.div
        []
        [ Html.div
            [ Html.Attributes.id "lowercase" ]
            [ Html.text <| boolToString lowercaseHandled
            ]
        , Html.div
            [ Html.Attributes.id "kebab" ]
            [ Html.text <| boolToString kebabHandled
            ]
        , Html.div
            [ Html.Attributes.id "camel" ]
            [ Html.text <| boolToString camelHandled
            ]
        , Html.div
            [ Html.Attributes.id "caps" ]
            [ Html.text <| boolToString capsHandled
            ]
        , Html.div
            [ Html.Attributes.id "pascal" ]
            [ Html.text <| boolToString pascalHandled
            ]
        , Html.node "ce-with-event"
            [ Html.Attributes.id "wc"
            , Html.Events.on "lowercaseevent" (Json.Decode.succeed (EventFired (\m -> { m | lowercaseHandled = True })))
            , Html.Events.on "kebab-event" (Json.Decode.succeed (EventFired (\m -> { m | kebabHandled = True })))
            , Html.Events.on "camelEvent" (Json.Decode.succeed (EventFired (\m -> { m | camelHandled = True })))
            , Html.Events.on "CAPSevent" (Json.Decode.succeed (EventFired (\m -> { m | capsHandled = True })))
            , Html.Events.on "PascalEvent" (Json.Decode.succeed (EventFired (\m -> { m | pascalHandled = True })))
            ]
            []
        ]


boolToString : Bool -> String
boolToString bool =
    if bool then "true" else "false"