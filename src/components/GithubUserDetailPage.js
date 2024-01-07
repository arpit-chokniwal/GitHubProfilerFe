import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLazyGetGithubUserDetailQuery } from "../redux/api/githubProfilerSlice";
import { getQueryParams } from "../utils/helperFunction";
import {
    Buildings,
    Clock,
    Database,
    EnvelopeSimple,
    GithubLogo,
    User,
} from "@phosphor-icons/react";
import moment from "moment";
import MyLineChart from "./Chart";
import DoughnutChart from "./CircularChart";

const GithubUserDetailPage = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const searchQuery = getQueryParams(location.search, "search_query");
    const [userDetail, setUserDetail] = useState({});
    const [quarterGraphData, setQuarterGraphData] = useState({});
    const [chartDetail, setChartDetail] = useState({});
    const [starsPerLanguage, setStarsPerLanguage] = useState({});
    const [starsPerRepo, setStarsPerRepo] = useState({});
    const [languagePercentages, setLanguagePercentages] = useState({});
    const [reposPerLanguage, setReposPerLanguage] = useState({});
    const [commitsPerLanguage, setCommitsPerLanguage] = useState({});

    const [
        getGitUser,
        {
            data: gitUserData,
            isSuccess: gitUserSuccess,
            isLoading: gitUserLoading,
            isError: gitUserError,
        },
    ] = useLazyGetGithubUserDetailQuery();

    useEffect(() => {
        if (!searchQuery || searchQuery.length > 0 === 0) {
            navigation("/");
        } else {
            getGitUser(searchQuery);
        }
        if (gitUserError) {
            navigation(`/search?search_query=${searchQuery}&error=not_found`);
        }
        if (gitUserSuccess && gitUserData?.details) {
            setUserDetail(gitUserData.details.userDetails);
            setQuarterGraphData(gitUserData.details.quarterGraphData);
            const labels = Object.keys(
                gitUserData.details.quarterGraphData
            ).reverse();
            const values = labels.map(
                (label) => gitUserData.details.quarterGraphData[label]
            );
            setChartDetail({ labels, values });
            setStarsPerLanguage(gitUserData.details.starsPerLanguage);
            setStarsPerRepo(gitUserData.details.starsPerRepo);
            setReposPerLanguage(gitUserData.details.reposPerLanguage);
            setLanguagePercentages(gitUserData.details.languagePercentages);
            setCommitsPerLanguage(gitUserData.details.commitsPerLanguage);
        }
    }, [getGitUser, navigation, searchQuery, gitUserError, gitUserSuccess]);

    const UserDetailItem = ({ icon: Icon, label, value, isLink }) => {
        return value ? (
            <div className="flex gap-2 justify-start items-center">
                <Icon size={20} />
                {isLink ? (
                    <a
                        className="text-md text-blue-400"
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View profile on GitHub
                    </a>
                ) : (
                    <p className="text-md font-sans">{label}</p>
                )}
            </div>
        ) : null;
    };
    const ChartContainer = ({ title, data }) => {
        return (
            <div className="h-[350px] w-full md:w-[30vw] flex flex-col justify-center text-center">
                <h1 className="text-3xl">{title}</h1>
                <DoughnutChart data={data} />
            </div>
        );
    };
    const chartsData = [
        { title: "Stars per Language", data: starsPerLanguage },
        { title: "Stars per Repo", data: starsPerRepo },
        { title: "Repos per Language", data: reposPerLanguage },
        { title: "Overall Used Language", data: languagePercentages },
        { title: "Commits per Repo", data: commitsPerLanguage },
    ];

    return (
        <div>
            {" "}
            {gitUserLoading ? (
                <p>Loading user details....</p>
            ) : (
                <div className="p-5">
                    {/* user detail */}
                    <div className="h-[25vh] border-b-2 p-3 border-[#d6d1c8] flex justify-around">
                        {/* Image div */}
                        <div className="h-[180px] w-[180px]">
                            <img
                                src={userDetail.avatarUrl}
                                alt="image"
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                        {/* Details */}
                        <div className="flex flex-col justify-between py-2 gap-1">
                            <UserDetailItem
                                icon={User}
                                label={`${userDetail.login} (${userDetail.name})`}
                                value={userDetail.login}
                            />
                            <UserDetailItem
                                icon={Database}
                                label={`${userDetail.starredRepositoriesCount} star repos`}
                                value={userDetail.starredRepositoriesCount}
                            />
                            <UserDetailItem
                                icon={Clock}
                                label={`Joined GitHub ${moment(
                                    userDetail.createdAt
                                ).fromNow()}`}
                                value={userDetail.createdAt}
                            />
                            <UserDetailItem
                                icon={EnvelopeSimple}
                                label={userDetail.email}
                                value={userDetail.email}
                            />
                            <UserDetailItem
                                icon={Buildings}
                                label={userDetail.company}
                                value={userDetail.company}
                            />
                            <UserDetailItem
                                icon={GithubLogo}
                                label={userDetail.url}
                                value={userDetail.url}
                                isLink
                            />
                        </div>

                        {/* Chart */}
                        {quarterGraphData && <MyLineChart {...chartDetail} />}
                    </div>

                    <div className="w-full mt-12 flex flex-wrap gap-2 justify-around">
                        {chartsData.map(
                            (chart, index) =>
                                Object.keys(chart.data).length > 0 && (
                                    <ChartContainer
                                        key={index}
                                        title={chart.title}
                                        data={chart.data}
                                    />
                                )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GithubUserDetailPage;
