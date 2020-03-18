module WithImperativeEvent exposing (main)

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


type Model
    = EventBefore
    | EventAfter


type Msg = EventFired


init : () -> ( Model, Cmd Msg )
init _ =
    ( EventBefore, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        EventFired ->
            case  model of
                EventBefore ->
                    ( EventAfter, Cmd.none )

                EventAfter ->
                    ( EventBefore, Cmd.none )


view : Model -> Html Msg
view model =
    Html.div
        []
        [ Html.div
            [ Html.Attributes.id "handled" ]
            [ Html.text <|
                case model of
                    EventBefore -> "false"
                    EventAfter -> "true"
            ]
        , Html.node "ce-with-event"
            [ Html.Attributes.id "wc"
            , Html.Events.on "camelEvent" (Json.Decode.succeed EventFired)
            ]
            []
        ]
