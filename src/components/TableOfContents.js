import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { slugify, withHyphens } from '../lib/helpers';

const CHAPTER_QUERY = gql`
	query ChapterQuery {
		chapters {
			number
			title
			sections {
				number
				title
			}
		}
	}
`;

const LoadingSkeleton = () => (
	<div>
		<h1>
			<Skeleton />
		</h1>
		<Skeleton count={4} />
	</div>
);

export default () => {
	const { data: { chapters } = {}, loading } = useQuery(CHAPTER_QUERY);
	console.log(chapters);

	return (
		<nav className='TableOfContents'>
			{loading ? (
				<LoadingSkeleton />
			) : (
				<ul className='TableOfContents-chapters'>
					{chapters.map((chapter) => {
						const chapterIsNumbered = chapter.number !== null;
						return (
							<li
								className={classNames({ numbered: chapterIsNumbered })}
								key={chapter.id}
							>
								<NavLink
									to={{
										pathname: slugify(chapter),
										state: { chapter, section: chapter.sections[0] },
									}}
									className='TableOfContents-chapter-link'
									activeClassName='active'
									isActive={(match, location) => {
										const rootPath = location.pathname.split('/')[1];
										return rootPath.includes(withHyphens(chapter.title));
									}}
								>
									{chapterIsNumbered && (
										<span className='TableOfContents-chapter-number'>
											{chapter.number}
										</span>
									)}
									{chapter.title}
								</NavLink>
								{chapterIsNumbered && (
									<ul className='TableOfContents-sections'>
										{chapter.sections.map((section) => (
											<li key={section.number}>
												<NavLink
													to={{
														pathname: slugify(chapter, section),
														state: { chapter, section },
													}}
													className='TableOfContents-section-link'
													activeClassName='active'
												>
													{section.title}
												</NavLink>
											</li>
										))}
									</ul>
								)}
							</li>
						);
					})}
				</ul>
			)}
		</nav>
	);
};
