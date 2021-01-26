module WithProperties exposing (main)

import Html exposing (Html)
import Html.Attributes
import Json.Encode

main : Html msg
main =
    Html.node "ce-with-properties"
        [ Html.Attributes.id "wc"
        , Html.Attributes.property "bool" <| Json.Encode.bool True
        , Html.Attributes.property "num" <| Json.Encode.int 42
        , Html.Attributes.property "str" <| Json.Encode.string "Elm"
        , Html.Attributes.property "arr" <|
            Json.Encode.list Json.Encode.string [ "E", "l", "m" ]
        , Html.Attributes.property "obj" <|
            Json.Encode.object
                [ ( "org", Json.Encode.string "Elm Foundation" )
                , ( "website", Json.Encode.string "elm-lang.org" )
                ]

        ]
        []