package com.inkubiks.eventservice.presentation

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.bumptech.glide.Glide
import com.inkubiks.eventservice.R
import com.inkubiks.eventservice.adapters.ListAvatarUser
import com.inkubiks.eventservice.adapters.ScheduleEventsAdapter
import com.inkubiks.eventservice.databinding.FragmentProfileBinding
import com.inkubiks.eventservice.models.profile.Profile
import com.inkubiks.eventservice.models.profile.Status
import com.inkubiks.eventservice.presentation.GuestProfileFragment.Companion.DATA_GUEST_PROFILE_ARG
import com.inkubiks.eventservice.viewmodel.ProfileViewModel
import org.koin.androidx.viewmodel.ext.android.viewModel

class ProfileFragment : Fragment() {

    private var binding: FragmentProfileBinding? = null
    private val viewModel: ProfileViewModel by viewModel()
    private var teamAdapter: ListAvatarUser? = null
    private var friendsAdapter: ListAvatarUser? = null
    private var myEvents: ScheduleEventsAdapter? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        teamAdapter = ListAvatarUser(
            object : ListAvatarUser.Listener {
                override fun clickUser(profile: Profile) {
                    findNavController().navigate(
                        R.id.guestProfileFragment,
                        bundleOf(DATA_GUEST_PROFILE_ARG to profile)
                    )
                }
            }
        )
        friendsAdapter = ListAvatarUser(
            object : ListAvatarUser.Listener {
                override fun clickUser(profile: Profile) {
                    findNavController().navigate(
                        R.id.guestProfileFragment,
                        bundleOf(DATA_GUEST_PROFILE_ARG to profile)
                    )
                }
            }
        )
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentProfileBinding.inflate(layoutInflater, container, false)
        return binding?.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        uiListener()
        initTeamRecyclerView()
        initFriendsRecyclerView()
        binding?.apply {
            if (viewModel.value.isGuest) {
                headProfile.ivBack.visibility = View.VISIBLE
            }
            if (viewModel.value.status == Status.ON_HOLIDAY.value) {
                headProfile.ivHoliday.visibility = View.VISIBLE
            }
            Glide.with(this@ProfileFragment)
                .load(viewModel.value.avatar)
                .override(250, 250)
                .circleCrop()
                .into(headProfile.avatar)
            headProfile.tvNameUser.text = viewModel.value.name
            headProfile.tvStatus.text = viewModel.value.status
            headProfile.tvCity.text = viewModel.value.city
            tvDepartment.text = viewModel.value.department
            tvPosition.text = viewModel.value.position
            tvExperience.text = viewModel.value.experience
        }
        teamAdapter?.setData(viewModel.value.team)
        friendsAdapter?.setData(viewModel.value.friends)
    }

    private fun initTeamRecyclerView() {
        val linearLayoutManager = LinearLayoutManager(context)
        linearLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        binding?.rvTeam?.apply {
            layoutManager = linearLayoutManager
            adapter = teamAdapter
        }
    }

    private fun initFriendsRecyclerView() {
        val linearLayoutManager = LinearLayoutManager(context)
        linearLayoutManager.orientation = LinearLayoutManager.HORIZONTAL
        binding?.rvFriends?.apply {
            layoutManager = linearLayoutManager
            adapter = friendsAdapter
        }
    }

    private fun uiListener() {
        binding?.apply {
            headProfile.ivSettings.setOnClickListener {

            }
        }
    }

}
