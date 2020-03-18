port module WithDifferentViews exposing (main)

import Browser
import Html exposing (Html)
import Html.Attributes

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , subscriptions = subscriptions
        , update = update
        , view = view
        }


type Model
    = ViewA
    | ViewB

type Msg = Toggle

init : () -> ( Model, Cmd Msg )
init _ =
    ( ViewA, Cmd.none )


subscriptions : Model -> Sub Msg
subscriptions _ =
    toggle (\_ -> Toggle)


port toggle : (() -> msg) -> Sub msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Toggle ->
            case  model of
                ViewA ->
                    ( ViewB, Cmd.none )

                ViewB ->
                    ( ViewA, Cmd.none )


view : Model -> Html Msg
view model =
    case model of
        ViewA ->
             Html.node "ce-with-children" [ Html.Attributes.id "wc" ] [] 

        ViewB ->
            Html.div [ Html.Attributes.id "dummy" ] [ Html.text "Dummy view" ]
