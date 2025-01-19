import { useState, useEffect } from "react";
import axios from "axios";
import {
    addSkillToFavoritesUrl,
    removeSkillFromFavoritesUrl,
} from "../constants/endpoints";
import { developmentMode } from "../constants/devTools";

import Button from "./Button";
import GreyHeartIcon from "../icons/GrayHeartIcon";
import HeartIcon2 from "../icons/HeartIcon2";
import LoadingComponent from "./LoadingComponent";

type FavoriteButtonTypes = {
    userId: number | string;
    skillId: string;
    favoriteSkills: string[];
};

export default function FavoriteButton(props: FavoriteButtonTypes) {
    const { userId, skillId, favoriteSkills } = props;

    // Local State
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (favoriteSkills.includes(skillId)) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [favoriteSkills]);

    const addSkillToFavorites = async () => {
        console.log(isFavorite);
        setLoading(true);

        const dataAndAction = {
            action: "add",
            userId: userId,
            skillId: skillId,
        };

        try {
            const res = await axios.post(addSkillToFavoritesUrl, dataAndAction);
            if (developmentMode) {
                setIsFavorite(!isFavorite);
            } else {
                setIsFavorite(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (developmentMode) {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } else {
                setLoading(true);
            }
        }
    };

    const removeSkillFromFavorites = async () => {
        console.log(isFavorite);
        setLoading(true);

        const dataAndAction = {
            action: "remove",
            userId: userId,
            skillId: skillId,
        };

        try {
            const res = await axios.post(
                removeSkillFromFavoritesUrl,
                dataAndAction
            );
            if (developmentMode) {
                setIsFavorite(!isFavorite);
            } else {
                setIsFavorite(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (developmentMode) {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } else {
                setLoading(true);
            }
        }
    };

    return (
        <Button
            className="btn btn--add-to-favorites"
            type="button"
            onClick={
                isFavorite
                    ? () => removeSkillFromFavorites()
                    : () => addSkillToFavorites()
            }
        >
            {!loading && !isFavorite && <GreyHeartIcon />}
            {!loading && isFavorite && <HeartIcon2 />}
            {loading && <LoadingComponent size="small" color="#2d6e46" />}
        </Button>
    );
}
