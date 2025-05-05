import * as React from 'react';
import Popover from '@mui/material/Popover';
import { Avatar } from '@mui/material';
import { Link } from 'react-router';
import ProfileCard from '../../../features/profiles/ProfileCard';

type Props = {
	profile: Profile
	size?: number
}

export default function AvatarPopover({profile, size} : Props) {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<div>
			<Avatar
				alt={profile.displayName + ' image'}
				src={profile.imageUrl}
				component={Link}
				sx={{
					border: profile.following ? 3 : 0,
					borderColor: 'secondary.main',
					height: size,
					width: size
				}}
				to={`/profiles/${profile.id}`}
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
			/>

			<Popover
				id="mouse-over-popover"
				sx={{ pointerEvents: 'none' }}
				open={open}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
				disableScrollLock
			>
				<ProfileCard profile={profile} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} />
			</Popover>
		</div>
	);
}
